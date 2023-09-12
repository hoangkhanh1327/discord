import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const profile = await currentProfile();
        const { name, type } = await req.json();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get('serverId');

        if (!profile) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!serverId) {
            return new NextResponse('Server ID missing', { status: 400 });
        }

        if (name === 'general') {
            return new NextResponse('Name cannot be general', { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        },
                    },
                },
            },
            data: {
                channels: {
                    create: {
                        profileId: profile.id,
                        name,
                        channelType: type,
                    },
                },
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('[CHANNEL_POST_ERROR', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { memberId: string } }
) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get('serverId');

        if (!profile) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!serverId) {
            return new NextResponse('Server ID missing', { status: 400 });
        }

        if (!params.memberId) {
            return new NextResponse('Member ID missing', { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    deleteMany: {
                        id: params.memberId,
                        profileId: {
                            not: profile.id, // Sure that the current profile can't remove itself from server
                        },
                    },
                },
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: 'asc',
                    },
                },
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('[MEMBER_ID_DELETE_ERROR', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

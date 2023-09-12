import React from 'react';
import { redirect } from 'next/navigation';
import { ChannelType, MemberRole } from '@prisma/client';
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react';

import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';
import ServerHeader from '@/components/servers/ServerHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import ServerSearch from '@/components/servers/ServerSearch';
import { Separator } from '@/components/ui/separator';
import ServerSection from '@/components/servers/ServerSection';
import ServerChannel from './ServerChannel';
import ServerMember from './ServerMember';

interface IServerSidebar {
    serverId: string;
}

const iconMap = {
    [ChannelType.TEXT]: <Hash className='mr-2 h-4 w-4' />,
    [ChannelType.AUDIO]: <Mic className='mr-2 h-4 w-4' />,
    [ChannelType.VIDEO]: <Video className='mr-2 h-4 w-4' />,
};

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: (
        <ShieldCheck className='mr-2 h-4 w-4 text-indigo-500' />
    ),
    [MemberRole.ADMIN]: <ShieldAlert className='mr-2 h-4 w-4 text-rose-500' />,
};

const ServerSidebar: React.FC<IServerSidebar> = async ({ serverId }) => {
    const profile = await currentProfile();

    if (!profile) {
        redirect('/');
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
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

    if (!server) {
        redirect('/');
    }

    const textChannels = server?.channels.filter(
        (channel) => channel.channelType === ChannelType.TEXT
    );

    const audioChannels = server?.channels.filter(
        (channel) => channel.channelType === ChannelType.AUDIO
    );

    const videoChannels = server?.channels.filter(
        (channel) => channel.channelType === ChannelType.VIDEO
    );

    const members = server?.members?.filter(
        (member) => member.profileId !== profile?.id
    );

    const role = server.members.find(
        (member) => member.profileId === profile.id
    )?.role;

    return (
        <div className='flex flex-col h-full text-primary w-full dark:bg-[#2B2031] bg-[#F2F3F5]'>
            <ServerHeader server={server} role={role} />
            <ScrollArea className='flex-1 px-3'>
                <div className='mt-2'>
                    <ServerSearch
                        data={[
                            {
                                label: 'Text Channels',
                                type: 'channel',
                                data: textChannels?.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.channelType],
                                })),
                            },
                            {
                                label: 'Voice Channels',
                                type: 'channel',
                                data: audioChannels?.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.channelType],
                                })),
                            },
                            {
                                label: 'Video Channels',
                                type: 'channel',
                                data: videoChannels?.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.channelType],
                                })),
                            },
                            {
                                label: 'Members',
                                type: 'member',
                                data: members?.map((member) => ({
                                    id: member.id,
                                    name: member.profile.name,
                                    icon: roleIconMap[member.role],
                                })),
                            },
                        ]}
                    />
                    <Separator className='bg-zinc-200 dark:bg-zinc-700 rounded-md my-2' />
                    {/* cast type to boolean value */}
                    {!!textChannels?.length && (
                        <div className='mb-2'>
                            <ServerSection
                                sectionType='channels'
                                channelType={ChannelType.TEXT}
                                role={role}
                                label='Text Channels'
                            />
                            <div className='space-y-[2px]'>
                                {textChannels?.map((channel) => {
                                    return (
                                        <ServerChannel
                                            key={channel.id}
                                            channel={channel}
                                            role={role}
                                            server={server}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    {!!audioChannels?.length && (
                        <div className='mb-2'>
                            <ServerSection
                                sectionType='channels'
                                channelType={ChannelType.AUDIO}
                                role={role}
                                label='Voice Channels'
                            />
                            <div className='space-y-[2px]'>
                                {audioChannels?.map((channel) => {
                                    return (
                                        <ServerChannel
                                            key={channel.id}
                                            channel={channel}
                                            role={role}
                                            server={server}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    {!!videoChannels?.length && (
                        <div className='mb-2'>
                            <ServerSection
                                sectionType='channels'
                                channelType={ChannelType.VIDEO}
                                role={role}
                                label='Video Channels'
                            />
                            <div className='space-y-[2px]'>
                                {videoChannels?.map((channel) => {
                                    return (
                                        <ServerChannel
                                            key={channel.id}
                                            channel={channel}
                                            role={role}
                                            server={server}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    {!!members?.length && (
                        <div className='mb-2'>
                            <ServerSection
                                sectionType='members'
                                role={role}
                                label='Members'
                                server={server}
                            />
                            <div className='space-y-[2px]'>
                                {members?.map((member) => {
                                    return (
                                        <ServerMember
                                            key={member.id}
                                            member={member}
                                            server={server}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
};

export default ServerSidebar;

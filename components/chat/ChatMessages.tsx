'use client';

import React, { Fragment } from 'react';
import { format } from 'date-fns';
import { Member, Message, Profile } from '@prisma/client';
import { Loader2, ServerCrash } from 'lucide-react';

import ChatWelcomeMessage from './ChatWelcomeMessage';
import { useChatQuery } from '@/hooks/use-chat-query';
import ChatItem from './ChatItem';

const DATE_FORMAT = 'd MMM yyyy, HH:mm';

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile;
    };
};
interface IChatMessages {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: 'channelId' | 'conversationId';
    paramValue: string;
    type: 'channel' | 'conversation';
}
const ChatMessages: React.FC<IChatMessages> = ({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type,
}) => {
    const queryKey = `chat:${chatId}`;

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
        useChatQuery({
            queryKey,
            apiUrl,
            paramKey,
            paramValue,
        });

    if (status === 'loading') {
        return (
            <div className='flex-1 flex flex-col justify-center items-center'>
                <Loader2 className='w-7 h-7 text-zinc-500 animate-spin my-4' />
                <p className='text-xs text-zinc-500 dark:text-zinc-400'>
                    Loading messages...
                </p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className='flex-1 flex flex-col justify-center items-center'>
                <ServerCrash className='w-7 h-7 text-zinc-500 animate-spin my-4' />
                <p className='text-xs text-zinc-500 dark:text-zinc-400'>
                    Something went wrong!
                </p>
            </div>
        );
    }
    console.log('data', data);
    return (
        <div className='flex-1 flex flex-col py-4 overflow-y-auto'>
            <div className='flex-1'>
                <ChatWelcomeMessage type={type} name={name} />
                <div className='flex flex-col-reverse mt-auto'>
                    {data?.pages?.map((group, i) => {
                        return (
                            <Fragment key={i}>
                                {group.items.map(
                                    (message: MessageWithMemberWithProfile) => (
                                        <ChatItem
                                            key={message.id}
                                            id={message.id}
                                            currentMember={member}
                                            member={message.member}
                                            content={message.content}
                                            fileUrl={message.fileUrl}
                                            deleted={message.deleted}
                                            timestamp={format(
                                                new Date(message.createdAt),
                                                DATE_FORMAT
                                            )}
                                            isUpdated={
                                                message.updatedAt !==
                                                message.createdAt
                                            }
                                            socketUrl={socketUrl}
                                            socketQuery={socketQuery}
                                        />
                                    )
                                )}
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ChatMessages;

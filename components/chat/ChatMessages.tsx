import { Member } from '@prisma/client';
import React from 'react';
import ChatWelcomeMessage from './ChatWelcomeMessage';

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
    return <div className='flex-1 flex flex-col py-4 overflow-y-auto'>
        <div className='flex-1'>
            <ChatWelcomeMessage type={type} name={name} />
        </div>
    </div>;
};

export default ChatMessages;

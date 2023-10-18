import { Channel, ChannelType, Server } from '@prisma/client';
import { create } from 'zustand';

export type ModalType =
    | 'createServer'
    | 'editServer'
    | 'leaveServer'
    | 'deleteSever'
    | 'invite'
    | 'member'
    | 'createChannel'
    | 'editChannel'
    | 'deleteChannel'
    | 'messageFile';

interface ModalData {
    server?: Server;
    channel?: Channel;
    channelType?: ChannelType;
    apiUrl?: string;
    query?: Record<string, any>;
}

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    data: ModalData;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ isOpen: false, type: null }),
}));

'use client';

import { useEffect, useState } from 'react';

import { CreateServerModal } from '@/components/modals/CreateServerModal';
import { EditServerModal } from '@/components/modals/EditServerModal';
import { InviteModal } from '@/components/modals/InviteModal';
import { MemberModal } from '@/components/modals/MemberModal';
import { CreateChannelModal } from '@/components/modals/CreateChannelModal';
import { LeaveServerModal } from '@/components/modals/LeaveServerModal';
import { DeleteServerModal } from '@/components/modals/DeleteServerModal';
import { DeleteChannelModal } from '@/components/modals/DeleteChannelModal';
import { EditChannelModal } from '../modals/EditChannelModal';

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <CreateServerModal />
            <EditServerModal />
            <LeaveServerModal />
            <DeleteServerModal />
            <InviteModal />
            <MemberModal />
            <CreateChannelModal />
            <EditChannelModal />
            <DeleteChannelModal />
        </>
    );
};

export default ModalProvider;

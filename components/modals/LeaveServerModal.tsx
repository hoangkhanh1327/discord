'use client';
import { useState } from 'react';
import axios from 'axios';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const LeaveServerModal = () => {
    const { isOpen, onClose, type, data, onOpen } = useModal();
    const router = useRouter();
    const { server } = data;
    const [loading, setLoading] = useState(false);

    const onLeaveServer = async () => {
        try {
            setLoading(true);
            await axios.patch(`/api/servers/${server?.id}/leave`);
            onClose();
            router.refresh();
            router.push('/');
        } catch (error) {
            console.log(['ON LEAVE SERVER ERROR'], error);
        } finally {
            setLoading(false);
        }
    };

    const isModalOpen = isOpen && type === 'leaveServer';

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold'>
                        Leave Server
                    </DialogTitle>
                    <DialogDescription className='text-center text-zinc-500'>
                        Are you sure to want to leave{' '}
                        <span className='font-semibold text-indigo-500'>
                            {server?.name}
                        </span>
                        ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='bg-gray-100 px-6 py-4'>
                    <div className='flex items-center justify-between w-full'>
                        <Button disabled={loading} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            disabled={loading}
                            variant='primary'
                            onClick={() => onLeaveServer()}
                        >
                            Leave
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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

export const DeleteServerModal = () => {
    const { isOpen, onClose, type, data, onOpen } = useModal();
    const router = useRouter();
    const { server } = data;
    const [loading, setLoading] = useState(false);

    const onLeaveServer = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/servers/${server?.id}`);
            onClose();
            router.refresh();
            router.push('/');
        } catch (error) {
            console.log(['ON DELETE SERVER ERROR'], error);
        } finally {
            setLoading(false);
        }
    };

    const isModalOpen = isOpen && type === 'deleteSever';

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold'>
                        Delete Server
                    </DialogTitle>
                    <DialogDescription className='text-center text-zinc-500'>
                        Are you sure to want to do this ?<br />
                        <span className='font-semibold text-indigo-500'>
                            {server?.name}
                        </span>
                        {` `}
                        will be permanently deleted/
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
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

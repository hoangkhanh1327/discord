'use client';
import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { UploadDropzone } from '@/lib/uploadthing';
import '@uploadthing/react/styles.css';

interface IFileUpload {
    onChange: (url?: string) => void;
    value: string;
    endpoint: 'messageFiles' | 'serverImage';
}
const FileUpload: React.FC<IFileUpload> = ({ endpoint, onChange, value }) => {
    const fileType = value?.split('.').pop();

    if (value && fileType !== 'pdf') {
        return (
            <div className='relative h-20 w-20'>
                <Image fill src={value} alt='Upload' className='rounded-full' />
                <button
                    className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm'
                    onClick={() => onChange('')}
                >
                    <X className='h-4 w-4'></X>
                </button>
            </div>
        );
    }
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0]?.url);
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }}
        />
    );
};

export default FileUpload;

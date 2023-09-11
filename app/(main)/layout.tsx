import NavigationSider from '@/components/navigation/NavigationSider';
import React from 'react';

interface IMainLayout {
    children: React.ReactNode;
}
const MainLayout: React.FC<IMainLayout> = ({ children }) => {
    return (
        <div className='h-full'>
            <div className='hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0'>
                <NavigationSider />
            </div>
            <main className='md:pl-[72px] h-full'>{children}</main>
        </div>
    );
};

export default MainLayout;

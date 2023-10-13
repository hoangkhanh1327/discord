import React from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import NavigationSider from '@/components/navigation/NavigationSider';
import ServerSidebar from '@/components/servers/ServerSidebar';

interface IMobileToggle {
    serverId: string;
}
const MobileToggle: React.FC<IMobileToggle> = ({ serverId }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='md:hidden'>
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className='p-0 flex gap-0'>
                <div className='w-[72px]'>
                    <NavigationSider />
                </div>
                <ServerSidebar serverId={serverId} />
            </SheetContent>
        </Sheet>
    );
};

export default MobileToggle;

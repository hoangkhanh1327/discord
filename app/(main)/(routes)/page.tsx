import { ModeToggle } from '@/components/mode-toggle';
import { UserButton } from '@clerk/nextjs';
export default function Home() {
    return (
        <div>
            <UserButton afterSignOutUrl='/' />
            <p className='text-3xl font-bold text-indigo-500'>
                This is protected routes.
            </p>
            <ModeToggle />
        </div>
    );
}

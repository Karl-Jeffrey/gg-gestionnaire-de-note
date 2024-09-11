'use client';

import { Dialog } from './ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { HomeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation'; 

function HomeButton({ className }: { className?: string }) {
  const router = useRouter(); 

  const handleHomeClick = () => {
    router.push('/'); 
  };

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          'text-secondary hover:text-primary transition-colors duration-200 ease-in-out',
          className,
        )}
        onClick={handleHomeClick} 
      >
        <HomeIcon className="size-10 sm:size-12" />
      </DialogTrigger>
    </Dialog>
  );
}

export default HomeButton;

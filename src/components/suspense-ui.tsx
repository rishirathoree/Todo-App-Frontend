import React from 'react';
import { Spinner } from "@/components/ui/spinner"
const Suspense01: React.FC = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-screen dark:bg-background bg-white z-50 flex justify-center flex-col gap-4 items-center'>
          <Spinner />
        </div>
    );
};

export default Suspense01;
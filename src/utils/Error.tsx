import React from 'react';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="text-error col-span-12 mx-auto flex h-10 w-full max-w-7xl items-center justify-center bg-red-100 p-2">
      {message}
    </div>
  );
};

export default Error;

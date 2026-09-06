import React from 'react';

interface ErrorProps {
  message?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const Error: React.FC<ErrorProps> = ({
  message = 'No results found',
  description = "We couldn't find what you're looking for. Try adjusting your search or explore other options.",
  actionLabel,
  onAction,
}) => {
  return (
    <div className="col-span-12 flex w-full flex-col items-center justify-center px-4 py-20 text-center">
      {/* Icon */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-slate-400 dark:text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 15.803a7.5 7.5 0 0 0 10.607 0Z"
          />
        </svg>
      </div>

      {/* Heading */}
      <h3 className="mb-2 text-xl font-semibold text-slate-800 dark:text-slate-100">{message}</h3>

      {/* Description */}
      <p className="max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {description}
      </p>

      {/* Optional action */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 rounded-xl bg-[#D96C4A] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#D96C4A]/20 transition-all hover:scale-105 hover:bg-[#c25838] active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default Error;

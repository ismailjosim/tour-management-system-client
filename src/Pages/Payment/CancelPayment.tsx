import { useEffect, useState } from 'react';

// Define the interface for the parsed URL parameters to ensure type safety.
interface PaymentParams {
    transactionId: string | null;
    amount: string | null;
    status: string | null;
    message: string | null;
}

// Define the CancelPayment component.
const CancelPayment = () => {
    // State to hold the parsed parameters.
    const [params, setParams] = useState<PaymentParams>({
        transactionId: null,
        amount: null,
        status: null,
        message: null,
    });

    // useEffect hook to parse the URL parameters when the component mounts.
    useEffect(() => {
        // Check if the window and location objects are available.
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            setParams({
                transactionId: urlParams.get('transactionId'),
                amount: urlParams.get('amount'),
                status: urlParams.get('status'),
                message: urlParams.get('message'),
            });
        }
    }, []);

    // Format the amount for display. Assuming it's in cents and the currency is USD.
    const formattedAmount = params.amount
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(parseInt(params.amount) / 100)
        : null;

    // Render the component's UI.
    return (
        <div className="flex min-h-screen items-center justify-center bg-[--color-background] p-4 text-[--color-foreground]">
            {/* The main card container, simulating a Shadcn Card component. */}
            <div className="w-full max-w-md rounded-[--radius] border border-[--color-border] bg-[--color-card] shadow-md transition-all duration-300 hover:shadow-lg">
                {/* Card header, simulating a Shadcn CardHeader */}
                <div className="flex flex-col space-y-1.5 border-b border-[--color-border] p-6 text-center">
                    {/* Error icon SVG */}
                    <div className="mx-auto mb-2 h-16 w-16 text-[--color-destructive]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 15a.75.75 0 100 1.5.75.75 0 000-1.5z" clipRule="evenodd" />
                        </svg>
                    </div>
                    {/* Card Title, simulating a Shadcn CardTitle */}
                    <h1 className="text-2xl font-semibold tracking-tight text-[--color-card-foreground]">
                        Payment Cancelled
                    </h1>
                    {/* Card Description, simulating a Shadcn CardDescription */}
                    <p className="text-sm text-[--color-muted-foreground]">
                        {params.message || 'The payment was cancelled or failed.'}
                    </p>
                </div>

                {/* Card content, simulating a Shadcn CardContent */}
                <div className="p-6">
                    <div className="grid gap-4">
                        {/* Transaction ID row */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[--color-muted-foreground]">
                                Transaction ID
                            </span>
                            <span className="text-sm font-semibold text-[--color-card-foreground]">
                                {params.transactionId || 'N/A'}
                            </span>
                        </div>
                        {/* Amount row */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[--color-muted-foreground]">
                                Amount
                            </span>
                            <span className="text-sm font-semibold text-[--color-card-foreground]">
                                {formattedAmount || 'N/A'}
                            </span>
                        </div>
                        {/* Status row */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[--color-muted-foreground]">
                                Status
                            </span>
                            <span className="text-sm font-semibold capitalize text-[--color-destructive]">
                                {params.status || 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Card footer with a button */}
                <div className="border-t border-[--color-border] p-6 text-center">
                    {/* Button, simulating a Shadcn Button component */}
                    <button
                        className="inline-flex h-10 items-center justify-center rounded-[--radius-sm] bg-[--color-primary] px-4 py-2 text-sm font-medium text-[--color-primary-foreground] ring-offset-[--color-background] transition-colors hover:bg-opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        onClick={() => {
                            // Example action: navigate back to the home page or dashboard.
                            if (typeof window !== 'undefined') {
                                window.location.href = '/';
                            }
                        }}
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelPayment;

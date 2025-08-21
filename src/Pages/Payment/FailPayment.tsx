import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router';

interface PaymentParams {
    transactionId: string | null;
    amount: string | null;
    status: string | null;
    message: string | null;
}

const FailPayment = () => {
    // State to hold the parsed parameters.
    const [params, setParams] = useState<PaymentParams>({
        transactionId: null,
        amount: null,
        status: null,
        message: null,
    });

    useEffect(() => {
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

    // Format the amount for display.
    const formattedAmount = params.amount
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(parseInt(params.amount) / 100)
        : null;

    return (
        <div className="flex min-h-screen items-center justify-center bg-[--color-background] p-4 text-[--color-foreground]">
            <div className="w-full max-w-md rounded-[--radius] border border-[--color-border] bg-[--color-card] shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="flex flex-col space-y-1.5 border-b border-[--color-border] p-6 text-center">
                    <div className="mx-auto mb-2 h-16 w-16 text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 15a.75.75 0 100 1.5.75.75 0 000-1.5z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight text-[--color-card-foreground]">
                        Payment Failed
                    </h1>
                    <p className="text-sm text-[--color-muted-foreground]">
                        {params.message || 'Your payment could not be processed.'}
                    </p>
                </div>
                <div className="p-6">
                    <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[--color-muted-foreground]">
                                Transaction ID
                            </span>
                            <span className="text-sm font-semibold text-[--color-card-foreground]">
                                {params.transactionId || 'N/A'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[--color-muted-foreground]">
                                Amount
                            </span>
                            <span className="text-sm font-semibold text-[--color-card-foreground]">
                                {formattedAmount || 'N/A'}
                            </span>
                        </div>
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
                <div className="border-t border p-6 text-center">
                    <Button asChild>
                        <Link className="w-full" to={"/"}>
                            Go Back
                        </Link>
                    </Button>
                </div>
            </div>
        </div>

    );
};

export default FailPayment;

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from "react-router";

interface ComponentProps {
    className?: string;
    [key: string]: any;
}

export default function Unauthorized() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-900 font-sans text-white">
            <Card className="w-[90%] max-w-lg bg-zinc-800 text-center shadow-2xl transition-all duration-300 hover:scale-105 sm:p-4">
                <CardHeader className="space-y-4">
                    <div className="flex justify-center">
                        <ShieldAlert className="h-16 w-16 text-red-500 animate-pulse" />
                    </div>
                    <CardTitle className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Access Denied
                    </CardTitle>
                    <CardDescription className="text-sm text-zinc-400 sm:text-base">
                        You do not have the necessary permissions to view this page.
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col items-center justify-center space-y-4">
                    <p className="text-base text-zinc-300">
                        Please log in with an authorized account or return to the home page.
                    </p>

                    <Button className="mt-4 w-full rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Back To Home
                    </Button>

                </CardContent>
            </Card>
        </div>
    );
}

const Card = ({ className, ...props }: ComponentProps) => (
    <div
        className={`rounded-xl border border-zinc-700 bg-zinc-800 p-6 ${className}`}
        {...props}
    />
);
const CardHeader = ({ className, ...props }: ComponentProps) => (
    <div
        className={`flex flex-col space-y-1.5 p-6 ${className}`}
        {...props}
    />
);
const CardTitle = ({ className, ...props }: ComponentProps) => (
    <h3
        className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
        {...props}
    />
);
const CardDescription = ({ className, ...props }: ComponentProps) => (
    <p
        className={`text-sm text-muted-foreground ${className}`}
        {...props}
    />
);
const CardContent = ({ className, ...props }: ComponentProps) => (
    <div className={`p-6 pt-0 ${className}`} {...props} />
);
const Button = ({ className, ...props }: ComponentProps) => (
    <Link to={'/'}
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 py-2 px-4 ${className}`}
        {...props}
    />
);
const ShieldAlert = (props: ComponentProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="M12 8v4"></path>
        <path d="M12 16h.01"></path>
    </svg>
);

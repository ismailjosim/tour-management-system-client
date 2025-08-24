import React from "react"

interface ErrorProps {
    message: string
}

const Error: React.FC<ErrorProps> = ({ message }) => {
    return (
        <div className="w-full flex items-center justify-center h-10 max-w-7xl mx-auto p-2 text-error bg-red-100 col-span-12">
            {message}
        </div>
    )
}

export default Error

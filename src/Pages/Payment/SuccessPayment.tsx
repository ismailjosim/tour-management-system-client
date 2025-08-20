import { CheckCircleIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "../../components/ui/button"
import { Link } from "react-router"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

interface PaymentSuccessParams {
	transactionId: string | null
	amount: string | null
	status: string | null
	message: string | null
}

export default function PaymentSuccess() {
	const [params, setParams] = useState<PaymentSuccessParams>({
		transactionId: null,
		amount: null,
		status: null,
		message: null,
	})
	const [showConfetti, setShowConfetti] = useState(false)
	const { width, height } = useWindowSize()

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		setParams({
			transactionId: urlParams.get("transactionId"),
			amount: urlParams.get("amount"),
			status: urlParams.get("status"),
			message: urlParams.get("message"),
		})

		setShowConfetti(true)
		const timer = setTimeout(() => setShowConfetti(false), 8000)
		return () => clearTimeout(timer)
	}, [])

	const formattedAmount = params.amount
		? new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "BDT",
		}).format(Number(params.amount))
		: "N/A"

	return (
		<>
			{/* Confetti with Tailwind fade */}
			<div
				className={`fixed inset-0 pointer-events-none transition-opacity duration-700 ease-in-out ${showConfetti ? "opacity-100" : "opacity-0"
					}`}
			>
				<Confetti width={width} height={height} />
			</div>

			<div className="flex min-h-screen items-center justify-center bg-[--color-background] p-4 text-[--color-foreground]">
				<div className="w-full max-w-md rounded-[--radius] border border-[--color-border] bg-[--color-card] shadow-md transition-all duration-300 hover:shadow-lg">
					{/* Header */}
					<div className="flex flex-col space-y-1.5 border-b border-[--color-border] p-6 text-center">
						<div className="mx-auto mb-2 text-primary">
							<CheckCircleIcon size={50} />
						</div>
						<h1 className="text-2xl font-semibold tracking-tight text-[--color-card-foreground]">
							Payment Successful!
						</h1>
						<p className="text-sm text-[--color-muted-foreground]">
							{params.message || "Your payment was completed successfully."}
						</p>
					</div>

					{/* Content */}
					<div className="p-6">
						<div className="grid gap-4">
							<InfoRow label="Transaction ID" value={params.transactionId} />
							<InfoRow label="Amount" value={formattedAmount} />
							<InfoRow
								label="Status"
								value={params.status || "N/A"}
								highlight={params.status === "success" ? "primary" : "destructive"}
							/>
						</div>
					</div>

					{/* Footer */}
					<div className="border-t border p-6 text-center">
						<Button asChild>
							<Link className="w-full" to={"/"}>
								Go Back
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}

interface InfoRowProps {
	label: string
	value: string | null
	highlight?: "primary" | "destructive"
}

const InfoRow = ({ label, value, highlight }: InfoRowProps) => (
	<div className="flex items-center justify-between">
		<span className="text-sm font-medium text-[--color-muted-foreground]">
			{label}
		</span>
		<span
			className={`text-sm font-semibold ${highlight ? `text-[--color-${highlight}]` : "text-[--color-card-foreground]"
				}`}
		>
			{value || "N/A"}
		</span>
	</div>
)

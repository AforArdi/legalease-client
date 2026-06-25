import { payment } from '@/lib/api/stripe/payment'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { getAuthToken, getUserSession } from '@/lib/api/core/getUserSession'
import { Card, Separator, Button } from '@heroui/react'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default async function Success({ searchParams }) {
    const user = await getUserSession();

    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const {
        status,
        metadata,
        customer_details: { email: customerEmail }
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {
        const token = await getAuthToken();
        await payment({
            userName: metadata.userName,
            userEmail: metadata.userEmail,
            lawyerName: metadata.lawyerName,
            lawyerEmail: metadata.lawyerEmail,
            fee: metadata.price,
            hiringReqId: metadata.hiringReqId,
            transactionId: session_id,
        }, token)
        return (
            <div className="min-h-[70vh] flex items-center justify-center p-4">
                <Card className="max-w-md w-full shadow-md flex flex-col">

                    {/* Replaced CardHeader with div */}
                    <div className="flex flex-col items-center gap-2 pb-4 pt-8 px-6 w-full">
                        <div className="rounded-full bg-success/20 p-3 mb-2">
                            <CheckCircle2 className="w-12 h-12 text-success" />
                        </div>
                        <h1 className="text-2xl font-bold text-center">Payment Successful!</h1>
                        <p className="text-default-500 text-center text-sm px-4">
                            We appreciate your business! A confirmation email has been sent to <span className="font-medium text-foreground">{customerEmail}</span>.
                        </p>
                    </div>

                    <Separator />

                    {/* Replaced CardBody with div */}
                    <div className="flex flex-col flex-auto w-full py-6 px-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <span className="text-default-500 text-sm">Lawyer Email</span>
                                <span className="font-medium text-sm">{metadata.lawyerEmail}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-default-500 text-sm">Transaction ID</span>
                                <span className="font-mono text-sm">{session_id.replace('cs_test_', '').slice(0, 12).toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-default-500 text-sm">Amount Paid</span>
                                <span className="font-semibold text-success text-lg">${metadata.price}</span>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Replaced CardFooter with div */}
                    <div className="w-full pt-6 pb-8 px-6 flex justify-center">
                        <Link href={`/dashboard/${user?.role}`}>
                            <Button
                                color="primary"
                                className="w-full font-medium"
                                size="lg"
                            >
                                Return to Dashboard
                            </Button>
                        </Link>
                    </div>

                </Card>
            </div>
        )
    }
}
import { payment } from '@/lib/api/stripe/payment'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'

export default async function Success({ searchParams }) {
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
        await payment({
            userName: metadata.userName,
            userEmail: metadata.userEmail,
            lawyerName: metadata.lawyerName,
            lawyerEmail: metadata.lawyerEmail,
            fee: metadata.price,
            hiringReqId: metadata.hiringReqId,
            transactionId: session_id,
        })
        return (
            <section id="success">
                <p>
                    We appreciate your business! A confirmation email will be sent to{' '}
                    {customerEmail}. If you have any questions, please email{' '}
                    <a href="mailto:admin@legalease.com">admin@legalease.com</a>.
                </p>
            </section>
        )
    }
}
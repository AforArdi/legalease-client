import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { getUserSession } from '@/lib/api/core/getUserSession'

export async function POST(request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const user = await getUserSession();
        const formData = await request.formData();
        const lawyerName = formData.get('lawyerName');
        const lawyerEmail = formData.get('lawyerEmail');
        const fee = formData.get('fee');
        const hiringReqId = formData.get('hiringReqId');

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    // price: '{{PRICE_ID}}',
                    price_data: {
                        currency: "usd",
                        unit_amount: fee * 100,
                        product_data: {
                            name: lawyerName,
                        }
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                price: fee,
                userName: user?.name,
                userEmail: user?.email,
                lawyerName,
                lawyerEmail,
                hiringReqId,
            },
            mode: 'payment',
            success_url: `${origin}/pricing/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}
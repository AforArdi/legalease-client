export const payment = async (data) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return res.json();
}
import { neon } from "@neondatabase/serverless";


export async function POST(request: Request) {
    try {
        const { ride_id, qr_code_url } = await request.json();

        if (!ride_id || ! qr_code_url) {
            return Response.json({ error: 'Missing reqiured fields' }, { status: 400 });
        } 
        
        const sql = neon(process.env.DATABASE_URL!);
        const response = await sql`
            INSERT INTO tickets (
                ride_id,
                qr_code_url
            ) VALUES (
                ${ride_id},
                ${qr_code_url}
            )
            RETURNING *
        `
        return Response.json({ data: response[0] }, { status: 201 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
import { neon } from "@neondatabase/serverless";


export async function GET() {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const response = await sql`
            SELECT COUNT(ticket_id) as tickets_quantity FROM tickets;
        `
        return Response.json(response[0], { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error }, { status: 500 });
    }
}
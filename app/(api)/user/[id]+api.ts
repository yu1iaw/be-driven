import { neon } from "@neondatabase/serverless";


export async function GET(request: Request, { id }: { id: string }) {
    if (!id) {
        return Response.json({ error: "Missing user id" }, { status: 400 });
    }

    try {
        const sql = neon(process.env.DATABASE_URL!);
        const response = await sql`
            SELECT 
                *
            FROM
                users
            WHERE id = ${id}
        `;

        return Response.json({ data: response[0] }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
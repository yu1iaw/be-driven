import { neon } from "@neondatabase/serverless";


export async function GET(request: Request, { name }: { name: string }) {    
    if (!name) {
        return Response.json({ error: "Missing username" }, { status: 400 });
    }

    const formattedName = decodeURI(name);
    try {
        const sql = neon(process.env.DATABASE_URL!);

        const response = await sql`
            SELECT 
                * 
            FROM 
                users 
            WHERE 
                name = ${formattedName}
        `
        return Response.json(response, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
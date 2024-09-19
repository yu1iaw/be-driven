import { neon } from '@neondatabase/serverless';


// See https://neon.tech/docs/serverless/serverless-driver
// for more information

export async function POST(request: Request) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const { name } = await request.json();

        if (!name) {
            return Response.json({ error: 'Missing reqiured fields' }, { status: 400 });
        } 

        const response = await sql`
            INSERT INTO users (name)
            VALUES (${name})
            ON CONFLICT(name)
            DO NOTHING

            RETURNING ID;
        `
    
        return Response.json(response[0], { status: 201 });
    } catch (error) {
        console.log(error);
        return Response.json({ error }, { status: 500 });
    }
}


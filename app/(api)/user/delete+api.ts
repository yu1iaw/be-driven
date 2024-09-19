import { neon } from '@neondatabase/serverless';

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        if (!id) {
            return Response.json({ error: 'Missing user id' }, { status: 400 });
        } 

        const sql = neon(process.env.DATABASE_URL!);
        const response = await sql`
            DELETE FROM users
            WHERE id = ${id}
            RETURNING id;
        `
        return Response.json(response, { status: 204 });
    } catch (error) {
        console.log(error);
        return Response.json({ error }, { status: 500 });
    }
}
import { neon } from "@neondatabase/serverless";

export async function GET(request: Request, { id }: { id: string }) {
    if (!id) {
        return Response.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const response = await sql`
            SELECT 
                ticket_id,
                qr_code_url,
                rides.ride_id,
                rides.origin_address,
                rides.destination_address,
                rides.fare_price,
                rides.payment_status,
                rides.created_at,
                json_build_object(
                    'driver_id', drivers.id,
                    'first_name', drivers.first_name,
                    'last_name', drivers.last_name,
                    'profile_image_url', drivers.profile_image_url,
                    'car_image_url', drivers.car_image_url,
                    'phone', drivers.phone
                ) AS driver
            FROM 
                tickets
            INNER JOIN 
                rides USING (ride_id)
            INNER JOIN 
                drivers ON rides.driver_id = drivers.id
            WHERE
                rides.user_id = ${id}
            ORDER BY
                tickets.created_at DESC;
        `
        return Response.json({ data: response }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error }, { status: 500 });
    }
    
}
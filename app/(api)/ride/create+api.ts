import { neon } from "@neondatabase/serverless";


export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (Object.values(body).some(v => !v)) {
            return Response.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        const sql = neon(process.env.DATABASE_URL!);

        const response = await sql`
            INSERT INTO rides ( 
                origin_address, 
                destination_address, 
                origin_latitude, 
                origin_longitude, 
                destination_latitude, 
                destination_longitude, 
                ride_time, 
                fare_price, 
                payment_status, 
                driver_id, 
                user_id
            ) VALUES (
                ${body.origin_address},
                ${body.destination_address},
                ${body.origin_latitude},
                ${body.origin_longitude},
                ${body.destination_latitude},
                ${body.destination_longitude},
                ${body.ride_time},
                ${body.fare_price},
                ${body.payment_status},
                ${body.driver_id},
                ${body.user_id}
            )
            RETURNING ride_id;
        `;

        return Response.json({ data: response[0] }, { status: 201 });
    } catch (error) {
        console.error("Error inserting data into recent_rides:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
import { Driver, Ride, Ticket, User } from "@prisma/client/react-native";
import { prisma } from "./db";


export const registerUser = async (user: { username: User["username"]; hashedPassword: User["hashedPassword"] }) => {
    try {
        const newUser = await prisma.user.create({
            data: user
        })

        return newUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const checkExistingUser = async (username: User["username"]) => {
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                username
            }
        })
        return existingUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const updateUserPassword = async (username: User["username"], hashedPassword: User["hashedPassword"]) => {
    try {
        await prisma.user.update({
            where: {
                username
            },
            data: {
                hashedPassword
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateUserPicture = async (username: User["username"], picture: User["picture"]) => {
    try {
        await prisma.user.update({
            where: {
                username
            },
            data: {
                picture
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteUser = async (username: User["username"]) => {
    try {
        await prisma.user.delete({
            where: {
                username
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Rides --------------------------------------

type RideEssentials = Omit<Ride, 'id' | 'createdAt' | 'updatedAt'>
export const createRide = async (ride: RideEssentials) => {
    try {
        const { id } = await prisma.ride.create({
            data: ride,
            select: {
                id: true
            }
        })
        return id;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getUserRidesQuantity = async (userId: User["id"]) => {
    try {
        const count = await prisma.ride.count({
            where: {
                userId
            }
        })
        return count;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export type RecentRide = Ride & {
    driver: Pick<Driver, 'firstName' | 'lastName' | 'carSeats'>
};

export const getUserRecentRides = async (userId: User["id"]) => {
    try {
        const rides = await prisma.ride.findMany({
            where: {
                userId
            },
            include: {
                driver: {
                    select: {
                        firstName: true,
                        lastName: true,
                        carSeats: true
                    }
                }
            },
            take: 5,
            orderBy: {
                createdAt: "desc"
            }
        })

        return rides;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getUserRides = async (userId: User["id"], count: number) => {
    try {
        const sliceOfRides = await prisma.ride.findMany({
            where: {
                userId
            },
            include: {
                driver: {
                    select: {
                        firstName: true,
                        lastName: true,
                        carSeats: true,
                    }
                },
            },
            take: 5,
            skip: count * 5,
            orderBy: {
                createdAt: "desc"
            }
        })
        
        return sliceOfRides;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Tickets -------------------------------------

type TicketEssentials = Omit<Ticket, 'id' | 'createdAt'>;

export const createTicket = async (ticket: TicketEssentials) => {
    try {
        await prisma.ticket.create({
            data: ticket
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export type TicketInfo = Ticket & {
    ride: Pick<Ride, 'originAddress' | 'destinationAddress' | 'farePrice' | 'paymentStatus' | 'createdAt'> & {
        driver: Driver;
    }
}

export const getUserTickets = async (userId: User["id"], count: number) => {
    try {
        const tickets = await prisma.ticket.findMany({
            where: {
                ride: {
                    userId
                }
            },
            include: {
                ride: {
                    select: {
                        originAddress: true,
                        destinationAddress: true,
                        farePrice: true,
                        paymentStatus: true,
                        createdAt: true,
                        driver: true
                    }
                }
            },
            take: 5,
            skip: count * 5,
            orderBy: {
                createdAt: "desc"
            }
        })

        return tickets;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getUserTicketsQuantity = async (userId: User["id"]) => {
    try {
        const count = await prisma.ticket.count({
            where: {
                ride: {
                    userId
                }
            }
        })
        return count;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Drivers -------------------------------------

export const upsertDrivers = async (driver: Driver) => {
    try {
        await prisma.driver.upsert({
            where: {
                id: driver.id
            },
            update: {},
            create: driver
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}
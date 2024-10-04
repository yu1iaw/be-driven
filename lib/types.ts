import { Decimal } from "@prisma/client/runtime/react-native";
import { TextInputProps, TouchableOpacityProps } from "react-native";


export type TUser = {
    id: string;
    name: string;
    picture_url: string;
}

export type TLightStore = {
    light: 'off' | 'on';
}

export type TCoords = {
    latitude: number;
    longitude: number;
}

export type TUserStore = {
    userId: number | null;
    username: string | null;
    hashedPassword: string | null;
    picture: string | null,
    createdAt: Date | null,
    initialCoords: TCoords | null;
    setUserId: (userId: number) => void;
    setUsername: (username: string) => void;
    setHashedPassword: (hashedPassword: string) => void;
    setPicture: (url: string) => void;
    setCreatedAt: (date: Date) => void;
    setInitialCoords: ({ latitude, longitude }: TCoords) => void;
    logout: () => void;
    deleteAccount: () => void;
}

export type Driver = {
    id: number;
    first_name: string;
    last_name: string;
    profile_image_url: string;
    car_image_url: string;
    car_seats: number;
    rating: string;
    phone: string;
}

export type Ticket = {
    ticket_id: number;
    ride_id: number;
    qr_code_url: string;
    origin_address: string;
    destination_address: string;
    fare_price: string;
    payment_status: string;
    created_at: string;
    driver: Omit<Driver, 'car_seats' | 'rating'>;
}

export type MarkerData = {
    latitude: number;
    longitude: number;
    id: number;
    title: string;
    profileImageUrl: string;
    carImageUrl: string;
    carSeats: number;
    rating: Decimal;
    firstName: string;
    lastName: string;
    time?: number;
    price?: string;
}

export type MapProps = {
    destinationLatitude?: number;
    destinationLongitude?: number;
    onDriverTimesCalculated?: (driversWithTimes: MarkerData[]) => void;
    selectedDriver?: number | null;
    onMapReady?: () => void;
}

export type Ride = {
    ride_id: number;
    origin_address: string;
    destination_address: string;
    origin_latitude: string;
    origin_longitude: string;
    destination_latitude: string;
    destination_longitude: string;
    ride_time: number;
    fare_price: string;
    payment_status: string;
    driver_id: number;
    user_kinde_id: string;
    created_at: string;
    driver: Pick<Driver, 'first_name' | 'last_name' | 'car_seats'>
}

export type ButtonProps = TouchableOpacityProps & {
    title: string;
    bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
    textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
    IconLeft?: React.ComponentType<any>;
    IconRight?: React.ComponentType<any>;
    className?: string;
}

export type GoogleInputProps = {
    icon?: string;
    initialLocation?: string | null;
    containerStyle?: string;
    textInputBackgroundColor?: string;
    disableScroll?: boolean;
    handlePress: ({
        latitude,
        longitude,
        address,
    }: {
        latitude: number;
        longitude: number;
        address: string;
    }) => void;
}

export type InputFieldProps = TextInputProps & {
    label: string;
    icon?: any;
    password?: boolean;
    secureTextEntry?: boolean;
    labelStyle?: string;
    containerStyle?: string;
    inputStyle?: string;
    iconStyle?: string;
    tintColor?: string;
    className?: string;
}

export type PaymentProps = {
    userId: number;
    fullName: string;
    amount: string | undefined;
    driverId: number | undefined;
    rideTime: number | undefined;
    email?: string;
}

export type LocationStore = {
    userLatitude: number | null;
    userLongitude: number | null;
    userAddress: string | null;
    destinationLatitude: number | null;
    destinationLongitude: number | null;
    destinationAddress: string | null;
    setUserLocation: ({
        latitude,
        longitude,
        address,
    }: {
        latitude: number;
        longitude: number;
        address: string;
    }) => void;
    setDestinationLocation: ({
        latitude,
        longitude,
        address,
    }: {
        latitude: number;
        longitude: number;
        address: string;
    }) => void;
}

export type DriverStore = {
    drivers: MarkerData[];
    selectedDriver: number | null;
    setSelectedDriver: (driverId: number) => void;
    setDrivers: (drivers: MarkerData[]) => void;
    clearSelectedDriver: () => void;
}

export type DriverCardProps = {
    item: MarkerData;
    selected: number;
    setSelected: () => void;
}
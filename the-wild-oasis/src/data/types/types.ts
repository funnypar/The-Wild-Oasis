export type Guest = {
    fullName: string;
    email: string;
    nationality: string;
    nationalID: string;
    countryFlag: string;
};

export type Cabin = {
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    image: string;
    description: string;
};

export type Booking = {
    created_at: Date;
    startDate: Date;
    endDate: Date;
    cabinId: number;
    guestId: number;
    hasBreakfast: boolean;
    observations: string;
    isPaid: boolean;
    numGuests: number;
};

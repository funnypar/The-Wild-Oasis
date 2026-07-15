export default interface IBooking {
    id?: number;
    created_at?: Date;
    startDate: Date;
    endDate: Date;
    numNights: number;
    numGuests: number;
    cabinPrice: number;
    extrasPrice: number;
    totalPrice: number;
    status: string;
    hasBreakfast: boolean;
    isPaid: boolean;
    observations?: string;
    cabinId: number;
    guestId: number;
}

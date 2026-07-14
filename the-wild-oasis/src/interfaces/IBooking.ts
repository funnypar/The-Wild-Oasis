export default interface IBooking {
    id?: number;
    created_at?: Date;
    startDate: Date;
    endDate: Date;
    numNights: number;
    numGuests: number;
    cabinPrice: number;
    extraPrice: number;
    totalPrice: number;
    status: string;
}

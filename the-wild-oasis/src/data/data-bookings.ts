import { add } from 'date-fns';
import type IBooking from '../interfaces/IBooking';

function fromToday(numDays: number, withTime = false) {
    const date = add(new Date(), { days: numDays });
    if (!withTime) date.setUTCHours(0, 0, 0, 0);
    return date;
}

// Per-cabin base price (used to compute cabinPrice = basePrice * numNights)
const cabinBasePrice: Record<number, number> = {
    1: 250,
    2: 400,
    3: 300,
    4: 450,
    5: 350,
    6: 500,
    7: 600,
    8: 700,
};

const BREAKFAST_PRICE_PER_GUEST_PER_NIGHT = 15;

function buildBooking(
    createdAtDaysFromToday: number,
    startDaysFromToday: number,
    endDaysFromToday: number,
    cabinId: number,
    guestId: number,
    hasBreakfast: boolean,
    observations: string,
    isPaid: boolean,
    numGuests: number,
): IBooking {
    const created_at = fromToday(createdAtDaysFromToday, true);
    const startDate = fromToday(startDaysFromToday);
    const endDate = fromToday(endDaysFromToday);
    const numNights = 1;

    const cabinPrice = cabinBasePrice[cabinId] * numNights;
    const extrasPrice = hasBreakfast
        ? numNights * numGuests * BREAKFAST_PRICE_PER_GUEST_PER_NIGHT
        : 0;
    const totalPrice = cabinPrice + extrasPrice;

    const now = new Date();
    let status: string;
    if (endDate < now) {
        status = 'checked-out';
    } else if (startDate <= now && now <= endDate) {
        status = 'checked-in';
    } else {
        status = 'unconfirmed';
    }

    return {
        created_at,
        startDate,
        endDate,
        numNights,
        numGuests,
        cabinPrice,
        extrasPrice,
        totalPrice,
        status,
        hasBreakfast,
        isPaid,
        observations,
        cabinId,
        guestId,
    };
}

export const bookings: IBooking[] = [
    // CABIN 001
    buildBooking(
        -20,
        0,
        7,
        1,
        2,
        true,
        'I have a gluten allergy and would like to request a gluten-free breakfast.',
        false,
        1,
    ),
    buildBooking(-33, -23, -13, 1, 3, true, '', true, 2),

    // CABIN 002
    buildBooking(-45, -45, -29, 2, 5, false, '', true, 2),
    buildBooking(-2, 15, 18, 2, 6, true, '', true, 2),

    // CABIN 003
    buildBooking(-65, -25, -20, 3, 8, true, '', true, 4),
    buildBooking(
        -2,
        -2,
        0,
        3,
        9,
        false,
        'We will be bringing our small dog with us',
        true,
        3,
    ),

    // CABIN 004
    buildBooking(-30, -4, 8, 4, 11, true, '', true, 4),

    // CABIN 005
    buildBooking(0, 14, 21, 5, 14, true, '', false, 5),

    // CABIN 006
    buildBooking(
        -3,
        0,
        11,
        6,
        17,
        false,
        "We will be checking in late, around midnight. Hope that's okay :)",
        true,
        6,
    ),

    // CABIN 008
    buildBooking(
        0,
        0,
        5,
        8,
        23,
        true,
        'I am celebrating my anniversary, can you arrange for any special amenities or decorations?',
        true,
        10,
    ),
];

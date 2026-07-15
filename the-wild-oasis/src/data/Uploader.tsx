import { isFuture, isPast, isToday } from 'date-fns';
import { useState } from 'react';
import type IBooking from '../interfaces/IBooking';
import type ICabin from '../interfaces/ICabin';
import type IGuest from '../interfaces/IGuest';
import supabase from '../services/supabase.service';
import Button from '../ui/Button';
import { subtractDates } from '../utils/helpers';
import { bookings } from './data-bookings';
import { cabins } from './data-cabins';
import { guests } from './data-guests';

interface IdRow {
    id: number;
}

async function deleteGuests(): Promise<void> {
    const { error } = await supabase.from('guests').delete().gt('id', 0);
    if (error) console.log(error.message);
}

async function deleteCabins(): Promise<void> {
    const { error } = await supabase.from('cabins').delete().gt('id', 0);
    if (error) console.log(error.message);
}

async function deleteBookings(): Promise<void> {
    const { error } = await supabase.from('bookings').delete().gt('id', 0);
    if (error) console.log(error.message);
}

async function createGuests(): Promise<void> {
    const { error } = await supabase.from('guests').insert(guests as IGuest[]);
    if (error) console.log(error.message);
}

async function createCabins(): Promise<void> {
    const { error } = await supabase.from('cabins').insert(cabins as ICabin[]);
    if (error) console.log(error.message);
}

async function createBookings(): Promise<void> {
    const { data: guestsIds } = await supabase
        .from('guests')
        .select('id')
        .order('id')
        .returns<IdRow[]>();
    const allGuestIds = (guestsIds ?? []).map((guest) => guest.id);

    const { data: cabinsIds } = await supabase
        .from('cabins')
        .select('id')
        .order('id')
        .returns<IdRow[]>();
    const allCabinIds = (cabinsIds ?? []).map((cabin) => cabin.id);

    const finalBookings: IBooking[] = (bookings as IBooking[]).map(
        (booking) => {
            const cabin = (cabins as ICabin[]).at(booking.cabinId - 1)!;

            // startDate/endDate are real Date objects — subtractDates must accept Date, not assume strings
            const numNights = subtractDates(booking.endDate, booking.startDate);

            const cabinPrice =
                numNights * (cabin.regularPrice - cabin.discount);
            const extrasPrice = booking.hasBreakfast
                ? numNights * 15 * booking.numGuests
                : 0;
            const totalPrice = cabinPrice + extrasPrice;

            const start = new Date(booking.startDate);
            const end = new Date(booking.endDate);

            let status: string = 'unconfirmed';
            if (isPast(end) && !isToday(end)) status = 'checked-out';
            if (isFuture(start) || isToday(start)) status = 'unconfirmed';
            if (
                (isFuture(end) || isToday(end)) &&
                isPast(start) &&
                !isToday(start)
            )
                status = 'checked-in';

            return {
                ...booking,
                numNights,
                cabinPrice,
                extrasPrice,
                totalPrice,
                guestId: allGuestIds.at(booking.guestId - 1) ?? booking.guestId,
                cabinId: allCabinIds.at(booking.cabinId - 1) ?? booking.cabinId,
                status,
            };
        },
    );

    console.log(finalBookings);

    const { error } = await supabase.from('bookings').insert(finalBookings);
    if (error) console.log(error.message);
}

export default function Uploader() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function uploadAll(): Promise<void> {
        setIsLoading(true);
        await deleteBookings();
        await deleteGuests();
        await deleteCabins();

        await createGuests();
        await createCabins();
        await createBookings();

        setIsLoading(false);
    }

    async function uploadBookings(): Promise<void> {
        setIsLoading(true);
        await deleteBookings();
        await createBookings();
        setIsLoading(false);
    }

    return (
        <div
            style={{
                marginTop: 'auto',
                backgroundColor: '#e0e7ff',
                padding: '8px',
                borderRadius: '5px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
            }}
        >
            <h3>SAMPLE DATA</h3>

            <Button onClick={uploadAll} disabled={isLoading}>
                Upload ALL
            </Button>

            <Button onClick={uploadBookings} disabled={isLoading}>
                Upload bookings ONLY
            </Button>
        </div>
    );
}

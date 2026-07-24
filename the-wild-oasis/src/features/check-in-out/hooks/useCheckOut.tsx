import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBooking } from '../../../services/apiBookings.service';

export default function useCheckOut() {
    const queryClient = useQueryClient();

    const { mutate: checkout, isPending: isCheckingOut } = useMutation({
        mutationFn: (bookingId: number) =>
            updateBooking(bookingId, {
                status: 'checked-out',
            }),
        mutationKey: ['booking'],
        onSuccess: (data) => {
            toast.success(`Booking ${data.id} successfully checked out.`);
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            queryClient.invalidateQueries({ queryKey: ['booking'] });
        },

        onError: () => {
            toast.error('There was an error in checking out.');
        },
    });

    return { checkout, isCheckingOut };
}

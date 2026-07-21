import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { updateBooking } from '../../../services/apiBookings.service';

export default function useCheckIn() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkin, isPending: isCheckingIn } = useMutation({
        mutationFn: (bookingId: number) =>
            updateBooking(bookingId, {
                status: 'checked-in',
                isPaid: true,
            }),
        mutationKey: ['booking'],
        onSuccess: (data) => {
            toast.success(`Booking ${data.id} successfully checked in.`);
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            navigate('/');
        },

        onError: () => {
            toast.error('There was an error in checking in.');
        },
    });

    return { checkin, isCheckingIn };
}

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookings } from '../../../services/apiBookings.service';

export const useBookings = () => {
    const [searchParams] = useSearchParams();

    // Filter value
    const filterValue = searchParams.get('status') || 'all';

    const filter =
        !filterValue || filterValue === 'all'
            ? null
            : { field: 'status', value: filterValue };

    const {
        data: bookings,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['bookings', filter],
        queryFn: () => getBookings({ filter }),
    });

    return { bookings, isLoading, error };
};

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

    const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';

    // Determine the sort order
    const [sortField, sortOrder] = sortByRaw.split('-');
    const sortBy = { field: sortField, direction: sortOrder };

    const {
        data: bookings,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['bookings', filter, sortBy],
        queryFn: () => getBookings({ filter, sortBy }),
    });

    return { bookings, isLoading, error };
};

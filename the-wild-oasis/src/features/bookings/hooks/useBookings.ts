import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookings } from '../../../services/apiBookings.service';

export const useBookings = () => {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

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

    // Pagination
    const page = Number(searchParams.get('page')) || 1;

    // Pre-fetching
    queryClient.prefetchQuery({
        queryKey: ['bookings', filter, sortBy, page + 1],
        queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

    const {
        data: { data: bookings, count } = { data: [], count: 0 },
        isLoading,
        error,
    } = useQuery({
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    return { bookings, isLoading, count, error };
};

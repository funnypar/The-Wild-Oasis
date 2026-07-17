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

    const page = Number(searchParams.get('page')) || 1;

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

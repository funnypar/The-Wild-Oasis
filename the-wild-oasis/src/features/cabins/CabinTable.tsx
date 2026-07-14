import { useSearchParams } from 'react-router-dom';
import type ICabin from '../../interfaces/ICabin';
import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';
import { useCabins } from './hooks/useCabins';

export default function CabinTable() {
    const { isLoading, cabins } = useCabins();
    const [searchParams] = useSearchParams();

    // Filter

    const filteredCabins = searchParams.get('filter') || 'all';

    let filteredCabinsList: ICabin[] | undefined = cabins;

    if (filteredCabins === 'all') {
        filteredCabinsList = cabins;
    } else if (filteredCabins === 'no-discount') {
        filteredCabinsList = cabins!.filter((cabin) => cabin.discount === 0);
    } else if (filteredCabins === 'with-discount') {
        filteredCabinsList = cabins!.filter((cabin) => cabin.discount > 0);
    }

    // Sort

    const sortBy = searchParams.get('sortBy') || 'name-asc';

    const [field, direction] = sortBy.split('-');

    const modifier = direction === 'asc' ? 1 : -1;

    const sortedCabinsList = filteredCabinsList?.sort(
        (a, b) => (a[field] - b[field]) * modifier,
    );

    if (isLoading) return <Spinner />;
    if (!cabins?.length) return <Empty resource='cabins' />;
    return (
        <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
            <Table.Header>
                <div></div>
                <div>Cabin</div>
                <div>Capacity</div>
                <div>Price</div>
                <div>Discount</div>
                <div></div>
            </Table.Header>
            <Table.Body
                data={sortedCabinsList}
                render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
            />
        </Table>
    );
}

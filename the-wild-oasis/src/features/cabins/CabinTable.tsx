import { useSearchParams } from 'react-router-dom';
import type ICabin from '../../interfaces/ICabin';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';
import { useCabins } from './hooks/useCabins';

export default function CabinTable() {
    const { isLoading, cabins } = useCabins();
    const [searchParams] = useSearchParams();

    const filteredCabins = searchParams.get('filter') || 'all';

    let filteredCabinsList: ICabin[] | undefined = cabins;

    if (filteredCabins === 'all') {
        filteredCabinsList = cabins;
    } else if (filteredCabins === 'no-discount') {
        filteredCabinsList = cabins!.filter((cabin) => cabin.discount === 0);
    } else if (filteredCabins === 'with-discount') {
        filteredCabinsList = cabins!.filter((cabin) => cabin.discount > 0);
    }

    if (isLoading) return <Spinner />;
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
                data={filteredCabinsList}
                render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
            />
        </Table>
    );
}

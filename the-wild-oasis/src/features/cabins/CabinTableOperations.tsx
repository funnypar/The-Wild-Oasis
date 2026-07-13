import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

export default function CabinTableOperations() {
    return (
        <TableOperations>
            <Filter
                filterField='filter'
                options={[
                    { value: 'all', label: 'All' },
                    { value: 'no-discount', label: 'No Discount' },
                    { value: 'with-discount', label: 'With Discount' },
                ]}
            />
        </TableOperations>
    );
}

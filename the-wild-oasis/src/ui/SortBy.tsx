import { useSearchParams } from 'react-router-dom';
import Select from './Select';

type Props = {
    options: { value: string; label: string }[];
};

export default function SortBy({ options }: Props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get('sortBy') || '';

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        searchParams.set('sortBy', e.target.value);
        setSearchParams(searchParams);
    }

    return (
        <Select
            options={options}
            type='white'
            value={sortBy}
            onChange={handleChange}
        />
    );
}

import { HiPencil, HiTrash } from 'react-icons/hi2';
import styled from 'styled-components';
import type ICabin from '../../interfaces/ICabin';
import Modal from '../../ui/Modal';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './hooks/useDeleteCabin';

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
    max-width: none;
    border-radius: 0.5rem;
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`;

const Price = styled.div`
    font-family: 'Sono';
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: 'Sono';
    font-weight: 500;
    color: var(--color-green-700);
`;

type Props = {
    cabin: ICabin;
};

export default function CabinRow({ cabin }: Props) {
    const { isDeleting, mutate } = useDeleteCabin();

    return (
        <TableRow role='row'>
            <Img src={cabin.image} alt={cabin.name} />
            <Cabin>{cabin.name}</Cabin>
            <div>Fits up to {cabin.maxCapacity} guests</div>
            <Price>{formatCurrency(cabin.regularPrice)}</Price>
            <Discount>{formatCurrency(cabin.discount)}</Discount>
            <div>
                <Modal>
                    <Modal.Open opens='edit'>
                        <button>
                            <HiPencil />
                        </button>
                    </Modal.Open>
                    <Modal.Window name='edit'>
                        <CreateCabinForm cabinToEdit={cabin} />
                    </Modal.Window>
                </Modal>

                <button onClick={() => mutate(cabin.id)} disabled={isDeleting}>
                    <HiTrash />
                </button>
            </div>
        </TableRow>
    );
}

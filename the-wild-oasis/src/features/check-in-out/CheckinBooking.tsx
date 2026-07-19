import styled from 'styled-components';
import BookingDataBox from '../bookings/BookingDataBox';

import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';

import { useMoveBack } from '../../hooks/useMoveBack';
import Spinner from '../../ui/Spinner';
import { useBooking } from '../bookings/hooks/useBooking';

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const moveBack = useMoveBack();

    const { booking, isLoading } = useBooking();

    function handleCheckin() {}

    if (isLoading) return <Spinner />;
    return (
        <>
            <Row type='horizontal'>
                <Heading as='h1'>Check in booking #{booking.id}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                <Button onClick={handleCheckin}>
                    Check in booking #{booking.id}
                </Button>
                <Button variation='secondary' onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;

import styled from 'styled-components';
import BookingDataBox from '../bookings/BookingDataBox';

import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';

import { useState } from 'react';
import { useMoveBack } from '../../hooks/useMoveBack';
import Checkbox from '../../ui/Checkbox';
import Spinner from '../../ui/Spinner';
import { formatCurrency } from '../../utils/helpers';
import { useBooking } from '../bookings/hooks/useBooking';
import useCheckIn from './hooks/useCheckIn';

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const { booking, isLoading } = useBooking();
    const [isConfirmedByUser, setIsConfirmedByUser] = useState(false);
    const moveBack = useMoveBack();
    const { checkin, isCheckingIn } = useCheckIn();

    const confirmPaid = booking?.isPaid || isConfirmedByUser;
    function handleCheckin() {
        if (!confirmPaid) return;
        checkin(booking.id);
    }

    if (isLoading) return <Spinner />;
    return (
        <>
            <Row type='horizontal'>
                <Heading as='h1'>Check in booking #{booking.id}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />
            <Box>
                <Checkbox
                    disabled={booking.isPaid || isCheckingIn}
                    id='confirm'
                    checked={confirmPaid}
                    onChange={() => setIsConfirmedByUser((prev) => !prev)}
                >
                    I confirm that {booking.guests.fullName} has paid the total
                    amount of {formatCurrency(booking.totalPrice)}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPaid || isCheckingIn}
                >
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

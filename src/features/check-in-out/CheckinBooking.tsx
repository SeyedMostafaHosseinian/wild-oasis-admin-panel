import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { BookingInterface } from "../../types/booking.interface";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const [isPaid, setIsPaid] = useState(false);
  const [breakfastCheck, setBreakfastCheck] = useState(false);
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { isLoading, booking } = useBooking();
  const { isUpdating, checkin } = useCheckin();

  useEffect(() => {
    setIsPaid(!!booking?.isPaid);
  }, [booking?.isPaid]);

  useEffect(() => {
    setBreakfastCheck(!!booking?.hasBreakfast);
  }, [booking?.hasBreakfast]);

  if (isLoading) return <Spinner />;

  const optionalBreakfastPrice =
    (settings?.breakfastPrice as number) *
    (booking?.numNights as number) *
    (booking?.numGuests as number);

  function handleCheckin() {
    checkin({
      id: booking?.id as number,
      breakfast: {
        extraPrice: breakfastCheck ? optionalBreakfastPrice : 0,
        hasBreakfast: breakfastCheck,
        totalPrice: breakfastCheck
          ? (booking?.cabinPrice as number) + (optionalBreakfastPrice || 0)
          : (booking?.cabinPrice as number),
      },
    });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking?.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking as BookingInterface} />
      <Box>
        <Checkbox
          checked={breakfastCheck}
          onChange={() => {
            setIsPaid(() => false);
            setBreakfastCheck((cur) => !cur);
          }}
          id="option-breakfast"
          disabled={isLoadingSettings}
        >
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)} ?
        </Checkbox>
      </Box>
      <Box>
        <Checkbox
          checked={isPaid}
          onChange={() => setIsPaid((cur) => !cur)}
          disabled={isPaid}
          id="agree-pay"
        >
          I confirm that {booking?.guests.fullName} has paid the total amount of{" "}
          {formatCurrency(
            breakfastCheck
              ? (booking?.cabinPrice as number) + optionalBreakfastPrice
              : (booking?.cabinPrice as number)
          )}{" "}
          {breakfastCheck && (
            <>
              ({formatCurrency(booking?.cabinPrice as number)} +
              {formatCurrency(optionalBreakfastPrice)})
            </>
          )}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          disabled={!isPaid || isUpdating}
          size="large"
          variation="primary"
          onClick={handleCheckin}
        >
          Check in booking #{booking?.id}
        </Button>
        <Button size="large" variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

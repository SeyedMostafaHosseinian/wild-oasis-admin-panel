import styled from "styled-components";
import { BookingInterface } from "../../types/booking.interface";
import Tag from "../../ui/Tag";
import CheckoutButton from "./CheckoutButton";
import { Flag } from "../../ui/Flag";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

export default function TodayItem({ booking }: { booking: BookingInterface }) {
  const {
    status,
    guests: { countryFlag, fullName },
    numNights,
    id,
  } = booking;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="blue">Arriving</Tag>}
      {status === "checked-in" && <Tag type="green">Departing</Tag>}

      <Flag src={countryFlag} />
      <Guest>{fullName}</Guest>
      <span>{numNights} nights</span>
      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

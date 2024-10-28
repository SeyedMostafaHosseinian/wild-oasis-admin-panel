import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { BookingInterface } from "../../types/booking.interface";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking } = useBooking();
  const status = "checked-in";

  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { isCheckingOut, checkout } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;

  if (!isLoading && !booking) return <Empty resource="booking details" />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {booking?.id}</Heading>
          <Tag type={statusToTagName[booking?.status || status]}>
            {(booking?.status || status).replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking as BookingInterface} />

      <ButtonGroup>
        {booking?.status === "unconfirmed" && (
          <Button
            size="large"
            variation="primary"
            onClick={() => navigate("/checkin/" + booking?.id)}
          >
            Check in booking #{booking?.id}
          </Button>
        )}
        {booking?.status === "checked-in" && (
          <Button
            size="large"
            variation="primary"
            onClick={() => checkout({ id: booking?.id })}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}
        <Button
          disabled={isDeleting}
          size="large"
          variation="danger"
          onClick={() => deleteBooking(booking?.id as number)}
        >
          Delete
        </Button>
        <Button size="large" variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;

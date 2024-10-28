import { ITEMS_PER_PAGE } from "../constants/items-per-page";
import { UpdateBookingDto } from "../types/dtos/update-booking.dto";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getAllBookings(params: {
  filter?: {
    fieldName: string;
    value: string | null;
  };
  order?: {
    fieldName: string;
    direction: string;
  };
  page: number;
}): Promise<{ data: any[]; count: number | null }> {
  let query = supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)", { count: "exact" });
  if (params?.filter?.fieldName && params?.filter?.value) {
    query = query.eq(params.filter.fieldName, params.filter.value);
  }

  if (params?.order?.fieldName && params?.order?.direction) {
    query = query.order(params.order.fieldName, {
      ascending: params.order.direction === "asc",
    });
  }
  const fromItemNumber = (params.page - 1) * ITEMS_PER_PAGE + 1;
  const toItemNumber = fromItemNumber + ITEMS_PER_PAGE - 1;

  query = query.range(fromItemNumber, toItemNumber);

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Cannot get bookings");
  }

  return { data, count };
}

export async function getBooking(id: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extraPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id: number, obj: UpdateBookingDto) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

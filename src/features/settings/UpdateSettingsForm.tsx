import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { isUpdating, updateSettings } = useUpdateSettings();

  function handleUpdate(e: any) {
    console.log({ [e.target.name]: e.target.value });
    updateSettings({ [e.target.name]: e.target.value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={isUpdating}
          name="minBookingLength"
          type="number"
          id="min-nights"
          defaultValue={settings?.minBookingLength}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isUpdating}
          name="maxBookingLength"
          type="number"
          id="max-nights"
          defaultValue={settings?.maxBookingLength}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isUpdating}
          name="maxGuestsPerBooking"
          type="number"
          id="max-guests"
          defaultValue={settings?.maxGuestsPerBooking}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          disabled={isUpdating}
          name="breakfastPrice"
          type="number"
          id="breakfast-price"
          defaultValue={settings?.breakfastPrice}
          onBlur={handleUpdate}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

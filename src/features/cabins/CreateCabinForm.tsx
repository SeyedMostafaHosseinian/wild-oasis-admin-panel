import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import { CabinInterface } from "../../types/cabin.interface";
import { useCreateUpdateCabin } from "./useCreateUpdateCabin";

function CreateCabinForm({
  editData,
  onCloseModal,
}: {
  editData?: CabinInterface;
  onCloseModal?: () => void;
}) {
  const isEditing = !!editData?.id;

  const { isLoading: isCreating, mutate } = useCreateUpdateCabin(
    isEditing,
    editData && editData
  );
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditing ? editData : {},
  });
  const { errors } = formState;

  async function onSubmit(data: any) {
    const updateObject = {
      ...data,
      image: data.image[0].name ? data.image[0] : editData?.image,
    };

    mutate(updateObject, {
      onSuccess: () => {
        if (!isEditing) reset();
        onCloseModal?.();
      },
    });
  }

  function onError() {
    // errors
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message as string}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors?.maxCapacity?.message as string}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.regularPrice?.message as string}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message as string}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        disabled={isCreating}
        error={errors?.description?.message as string}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isCreating}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message as string}>
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          disabled={isCreating}
          {...register("image", {
            required: isEditing
              ? false
              : "please upload an image for new cabin",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          size="medium"
          variation="secondary"
          type="reset"
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button size="medium" variation="primary" disabled={isCreating}>
          {isEditing ? "update" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

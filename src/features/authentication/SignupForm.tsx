import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { SignUpDto } from "../../types/dtos/sign-up.dto";
import { useSignUp } from "./useSignUp";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm({ onCloseModal }: { onCloseModal?: () => any }) {
  const { formState, register, getValues, handleSubmit } = useForm<
    { passwordConfirm: string } & SignUpDto
  >();
  const { signUp, isLoading } = useSignUp(onCloseModal && onCloseModal);
  const { errors } = formState;
  function onSubmit({ email, fullName, password }: SignUpDto) {
    signUp({ email, fullName, password });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message as string}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "Full name is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message as string}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "email is incorrect",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message as string}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 8,
              message: "password length should have at least 8 character",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={errors?.passwordConfirm?.message as string}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "password confirm is required",
            validate: (value) =>
              getValues().password === value || "passwords are not match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal && onCloseModal()}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;

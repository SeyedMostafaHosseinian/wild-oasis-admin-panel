import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp(callback?: () => any) {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      if (data.error) return toast.error(data.error.message);

      if (callback) callback();
      toast.success("The new user signed up successfully please verify email");
    },
    onError: (err: { message: string }) => toast.error(err?.message),
  });

  return { signUp, isLoading };
}

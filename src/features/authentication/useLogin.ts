import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return loginApi({ email, password });
    },

    onSuccess: (data) => {
      if (data.error) return toast.error(data.error.message);
      queryClient.setQueryData(["user"], () => data.data.user);
      toast.success("Welcome!");
      navigate("/dashboard", { replace: true });
    },
    onError: () => toast.error("email or password is incorrect!"),
  });

  return { isLoading, login };
}

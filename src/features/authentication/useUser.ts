import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { UserInterface } from "../../types/user.interface";

export function useUser(): {
  isLoading: boolean;
  user: UserInterface;
  isAuthenticated: boolean;
} {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    user: user as UserInterface,
    isAuthenticated: user?.role === "authenticated",
  };
}

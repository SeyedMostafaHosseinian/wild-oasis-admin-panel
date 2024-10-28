import { useQuery } from "@tanstack/react-query";
import { getAllUsers as getAllUsersApi } from "../../services/apiAuth";

export function useUsers() {
  const { isLoading, data } = useQuery({
    queryFn: getAllUsersApi,
    queryKey: ["users"],
  });

  return { isLoading, users: data?.data.users, error: data?.error };
}

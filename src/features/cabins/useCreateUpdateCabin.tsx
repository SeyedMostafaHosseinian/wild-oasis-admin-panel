import toast from "react-hot-toast";
import { createCabin, updateCabin } from "../../services/apiCabins";
import { CreateCabinInterface } from "../../types/create-cabin.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CabinInterface } from "../../types/cabin.interface";

export function useCreateUpdateCabin(
  isUpdate: boolean,
  editData?: CabinInterface
) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (newCabin: CreateCabinInterface) =>
      isUpdate && editData
        ? updateCabin({ ...newCabin, id: editData.id })
        : createCabin(newCabin),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err: any) => toast.error(err?.message as string),
  });

  return { isLoading, mutate };
}

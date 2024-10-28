import { CabinInterface } from "../cabin.interface";

export interface CreateCabinDto extends Partial<Omit<CabinInterface, "image">> {
  image: File | string;
}

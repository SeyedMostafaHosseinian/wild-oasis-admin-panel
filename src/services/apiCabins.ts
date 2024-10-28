import toast from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";
import { CreateCabinDto } from "../types/dtos/create-cabin.dto";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("Cabins cannot be loaded!");
  return data;
}

export async function deleteCabin(id: number) {
  return await supabase.from("cabins").delete().eq("id", id);
}

export async function createCabin(newCabin: CreateCabinDto) {
  // uploading file
  let imagePath, uploadError;

  const imageIsExist = typeof newCabin.image === "string";
  if (!imageIsExist) {
    const { error, uploadedImagePath } = await uploadCabinPhoto(
      newCabin?.image as File
    );
    uploadError = error;
    imagePath = uploadedImagePath;
  }

  if (uploadError) {
    toast.error(uploadError.message);
    throw new Error(uploadError.message);
  }

  return await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imageIsExist ? newCabin.image : imagePath }])
    .select();
}

export async function updateCabin(newCabinData: CreateCabinDto) {
  let uploadError: any, fileUploadResponse;
  const newImage = newCabinData.image;

  // check if we have new image upload it
  if ((newImage as File)?.name as string) {
    const { error, data } = await uploadCabinPhoto(newImage as File);
    uploadError = error;
    fileUploadResponse = data;
  }

  // handling upload error
  if (uploadError) {
    toast.error(uploadError?.message as string);
    throw new Error(uploadError?.message as string);
  }

  // create uploaded image path
  const uploadedImagePath = `${supabaseUrl}/storage/v1/object/public/${fileUploadResponse?.fullPath}`;

  return await supabase
    .from("cabins")
    .update({
      ...newCabinData,
      image: typeof newImage === "object" ? uploadedImagePath : newImage,
    })
    .eq("id", newCabinData.id)
    .select();
}

export function uploadCabinPhoto(file: File) {
  return uploadPhoto(file, "cabin-images");
}

export function uploadAvatar(file: File) {
  return uploadPhoto(file, "avatars");
}

async function uploadPhoto(file: File, bucketName: string) {
  const newFileName = `${Math.random()}-${file.name}`.split("/").join("");
  const response = await supabase.storage
    .from(bucketName)
    .upload(newFileName, file);
  const uploadedImagePath = `${supabaseUrl}/storage/v1/object/public/${response.data?.fullPath}`;

  return { ...response, uploadedImagePath };
}

import toast from "react-hot-toast";
import { SignUpDto } from "../types/dtos/sign-up.dto";
import { UpdateUserDto } from "../types/dtos/update-user.dto";
import supabase from "./supabase";
import { uploadAvatar } from "./apiCabins";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) return error;
}

export async function signUp({ email, fullName, password }: SignUpDto) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  return { data, error };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}
export async function getAllUsers() {
  const { data, error } = await supabase.auth.admin.listUsers();
  return { error, data };
}

export async function updateUser({
  updateDto,
  newAvatarFile: avatarFile,
}: {
  updateDto: UpdateUserDto;
  newAvatarFile?: File | null;
}) {
  // uploading file
  let avatarPath, uploadError;

  if (avatarFile) {
    const { uploadedImagePath, error } = await uploadAvatar(avatarFile);
    avatarPath = uploadedImagePath;
    uploadError = error;
  }

  if (uploadError) {
    toast.error(uploadError.message);
    throw new Error(uploadError.message);
  }

  const { data, error } = await supabase.auth.updateUser({
    ...updateDto,
    data: {
      ...updateDto.data,
      avatar: avatarPath,
    },
  });

  return { data, error };
}

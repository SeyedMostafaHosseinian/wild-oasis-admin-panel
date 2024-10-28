import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import { UserMetadata } from "@supabase/supabase-js";

const Avatar = styled.img`
  border-radius: 9999px;
  width: 3.5rem;
  height: 3.5rem;
`;

const StyledUserAvatar = styled.div`
  display: flex;
  column-gap: 1rem;
  align-items: center;
`;

export default function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user?.user_metadata as UserMetadata;
  return (
    <StyledUserAvatar>
      <Avatar src={avatar || "default-user.jpg"} />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}

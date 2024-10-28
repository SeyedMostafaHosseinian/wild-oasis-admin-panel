import styled from "styled-components";
import LogOut from "../features/authentication/LogOut";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import UserAvatar from "./UserAvatar";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeader = styled.header`
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-0);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 1rem;
  background-color: var(--color-grey-0);
`;

export default function Header() {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <UserAvatar />
      <ButtonIcon onClick={() => navigate("/account")}>
        <HiOutlineUser />
      </ButtonIcon>
      <DarkModeToggle />

      <LogOut />
    </StyledHeader>
  );
}

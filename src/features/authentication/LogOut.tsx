import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogout } from "./useLogout";

export default function LogOut() {
  const { isLoggingOut, logout } = useLogout();
  function handleLogout() {
    logout();
  }
  return (
    <div>
      <ButtonIcon disabled={isLoggingOut} onClick={handleLogout}>
        {isLoggingOut ? <SpinnerMini /> : <HiArrowRightStartOnRectangle />}
      </ButtonIcon>
    </div>
  );
}

import {
  createContext,
  MutableRefObject,
  ReactElement,
  useContext,
  useState,
} from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled, { css } from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface MenuStateInterface {
  openedId?: number;
  close?: () => void;
  open?: (id: number) => void;
}

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{
  position: { x: number; y: number };
  minWidth?: string;
}>`
  position: absolute;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  z-index: 20;

  ${(props) => {
    console.log(props);
    return (
      props?.minWidth &&
      css`
        min-width: ${props?.minWidth};
      `
    );
  }}
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext<MenuStateInterface>({});

export function Menus({
  children,
}: {
  children: ReactElement[] | ReactElement;
}) {
  const [openedId, setOpenedId] = useState<number | string>("");
  const close = () => setOpenedId("");
  const open = (id: number) => setOpenedId(id);
  return (
    <MenuContext.Provider value={{ openedId: openedId as number, close, open }}>
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ id }: { id: any }) {
  const { open, openedId, close } = useContext(MenuContext);
  function handleClick() {
    if ((openedId as any) === "" || openedId !== id) open?.(id);
    else close?.();
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({
  children,
  id,
  minWidth,
}: {
  children: any;
  id: any;
  minWidth?: string;
}) {
  const { openedId, close } = useContext(MenuContext);
  const ref = useOutsideClick(close as () => void);
  if (openedId !== id) return;
  return (
    <StyledList
      ref={ref as unknown as MutableRefObject<HTMLUListElement>}
      position={{ x: 25, y: 25 }}
      minWidth={minWidth}
    >
      {children}
    </StyledList>
  );
}
function Button({
  children,
  onClick,
  icon,
  disabled = false,
}: {
  children?: ReactElement | string;
  onClick?: () => void;
  icon?: any;
  disabled?: boolean;
}) {
  const { close } = useContext(MenuContext);
  function handleClick() {
    onClick?.();
    close?.();
  }
  return (
    <li>
      <StyledButton disabled={disabled} onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

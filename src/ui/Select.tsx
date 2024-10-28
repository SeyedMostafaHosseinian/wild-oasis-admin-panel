import styled from "styled-components";

const StyledSelect = styled.select<{ type: string }>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

export function Select({
  children,
  onChange,
  value,
  ...props
}: {
  children: any;
  type: string;
  value: string;
  onChange?: (e: any) => void;
}) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {children}
    </StyledSelect>
  );
}

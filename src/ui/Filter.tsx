import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<{ active: "true" | "false" }>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active === "true" &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

interface FilterOptions {
  value: string;
  label: string;
}
export default function Filter({
  fieldName,
  options,
}: {
  fieldName: string;
  options: FilterOptions[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(fieldName) || options.at(0)?.value;

  function handleClick(v: string) {
    searchParams.set(fieldName, v as any);
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((o) => {
        return (
          <FilterButton
            onClick={() => handleClick(o.value)}
            active={o.value === currentFilter ? "true" : "false"}
            disabled={o.value === currentFilter}
            key={o.value}
          >
            {o.label}
          </FilterButton>
        );
      })}
    </StyledFilter>
  );
}

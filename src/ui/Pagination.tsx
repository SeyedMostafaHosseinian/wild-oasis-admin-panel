import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { ITEMS_PER_PAGE } from "../constants/items-per-page";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button<{ active?: boolean }>`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Pagination({ count }: { count: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const lastPage = Math.ceil(count / ITEMS_PER_PAGE);
  function handleNext() {
    searchParams.set("page", (+currentPage + 1).toString());
    setSearchParams(searchParams);
  }
  function handlePrev() {
    searchParams.set("page", (+currentPage - 1).toString());
    setSearchParams(searchParams);
  }

  if (count < ITEMS_PER_PAGE) return;
  return (
    <StyledPagination>
      <P>
        showing <span>{(+currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to
        <span>
          {" "}
          {+currentPage === lastPage ? count : ITEMS_PER_PAGE * +currentPage}
        </span>{" "}
        of <span> {count}</span> result
      </P>
      <Buttons className="flex items-center">
        <PaginationButton onClick={handlePrev} disabled={+currentPage === 1}>
          <HiChevronLeft />
          prev
        </PaginationButton>
        <span className="font-bold text-blue-800">{currentPage}</span>
        <PaginationButton
          disabled={+currentPage === lastPage}
          onClick={handleNext}
        >
          next
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

import { createContext, ReactElement, useContext } from "react";
import styled from "styled-components";

interface TableStateInterface {
  columns?: string;
}

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  /* overflow: hidden; */
`;

const CommonRow = styled.div<{ columns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

// const Empty = styled.p`
//   font-size: 1.6rem;
//   font-weight: 500;
//   text-align: center;
//   margin: 2.4rem;
// `;

const TableContext = createContext<TableStateInterface>({});
export default function Table({
  columns,
  children,
}: {
  columns: string;
  children: ReactElement[];
}) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }: { children: any }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader columns={columns as string} as="header" role="header">
      {children}
    </StyledHeader>
  );
}
function Body({ data, render }: { data: any[]; render: (data: any) => any }) {
  return (
    <StyledBody role="section">{data.map((data) => render(data))}</StyledBody>
  );
}
function Row({ children }: { children: ReactElement[] | ReactElement }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns as string}>
      {children}
    </StyledRow>
  );
}

Table.Header = Header;
Table.Footer = Footer;
Table.Body = Body;
Table.Row = Row;

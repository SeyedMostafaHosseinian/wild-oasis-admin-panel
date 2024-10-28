import styled, { css } from "styled-components";

const Row = styled.div<{ type?: "horizontal" | "vertical" }>`
  display: flex;
  ${(props) =>
    (props.type === "horizontal" || !props.type) &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;
export default Row;

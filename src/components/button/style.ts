import styled from "styled-components";

export const ButtonContainer = styled.button<any>`
  height: 45px;
  background-color: ${({ bgColor }) => bgColor || "#2369f6"};
  outline: none;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
`;

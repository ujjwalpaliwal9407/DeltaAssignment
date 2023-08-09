import styled from "styled-components";
export const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  margin-top: 20px;
`;

export const DropDownMainContainer = styled.div`
  position: relative;
`;
export const DropDownLabelContainer = styled.div`
  height: 45px;
  width: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #fff;
  color: #000;
  font-size: 18px;
  padding: 0 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;
export const DropDownLabel = styled.div``;
export const DropDownContentContainer = styled.div`
  width: 100%;
  background-color: #fff;
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 10;
  border-radius: 10px;
  color: #000;
  padding: 0 26px;
  box-sizing: border-box;
`;
export const DropDownContent = styled.div`
  margin: 14px 0;
  cursor: pointer;
`;

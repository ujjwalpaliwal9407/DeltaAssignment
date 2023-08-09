import styled from "styled-components";
export const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  margin-top: 20px;
`;
export const UserImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;
export const UserImage = styled.div`
  height: 90px;
  width: 90px;
  background-color: #ff31cf;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserNameDetail = styled.div`
  font-size: 20px;
  color: #fff;
  text-align: center;
  margin: 10px 0;
  text-transform: uppercase;
`;

import { Link } from "react-router-dom";
import styled from "styled-components";
export const NavbarLayout = styled.div`
  height: 90px;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
`;

export const NavbarMainContainer = styled.div`
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavbarHeading = styled.div`
  font-size: 32px;
  color: #fff;
  font-weight: 600;
`;
export const NavbarButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 130px 130px;
  grid-gap: 30px;
`;

export const UserProfileContainer = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 100%;
  background-color: #ff31cf;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 18px;
`;

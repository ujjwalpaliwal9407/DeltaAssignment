import { useNavigate } from "react-router-dom";
import { AnimateaChar, Container, ParticipantBtn } from "../../styles/sharedStyles";
import Button from "../button/Button";
import { useState } from "react";
import {
  NavbarButtonWrapper,
  NavbarHeading,
  NavbarLayout,
  NavbarMainContainer,
  UserProfileContainer,
} from "./style";
import { AiOutlineUser } from "react-icons/ai";
import { Paths } from "../../routes/path";
import { useAppDispatch, useAppSelector } from "../../logic/redux/store/hooks";
import LogoutModal from "../customModal/components/logoutModal/LogoutModal";
import { setLoggedDetail, setLoggedIn } from "../../logic/redux/action/action";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    dispatch(setLoggedIn(false));
    dispatch(setLoggedDetail([]));
    setIsLogoutModalOpen(false);
    navigate(Paths.home);
  };

  return (
    <div>
      <NavbarLayout>
        <Container width="90%">
          <NavbarMainContainer>
            <AnimateaChar onClick={() => navigate(Paths.home)}>
              <h1>Ujjwal Paliwal</h1>
            </AnimateaChar>
            {isLoggedIn ? (
              <UserProfileContainer onClick={() => setIsLogoutModalOpen(true)}>
                <AiOutlineUser size={30} />
              </UserProfileContainer>
            ) : (
              <NavbarButtonWrapper>
                <ParticipantBtn
                  onClick={() => {
                    navigate(Paths.signIn);
                  }}
                >
                  <b>Sign in</b>
                </ParticipantBtn>
                <ParticipantBtn
                  onClick={() => {
                    navigate(Paths.signUp);
                  }}
                >
                  <b>Sign up</b>
                </ParticipantBtn>
                
              </NavbarButtonWrapper>
            )}
          </NavbarMainContainer>
        </Container>
      </NavbarLayout>
      {isLogoutModalOpen && (
        <LogoutModal
          modalOpen={setIsLogoutModalOpen}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default Navbar;

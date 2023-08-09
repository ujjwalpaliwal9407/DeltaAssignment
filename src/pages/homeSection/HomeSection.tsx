import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { Paths } from "../../routes/path";
import {
  AnimateaChar,
  Container,
  OpacityAnimation,
  ParticipantBtn,
  Wrapper,
} from "../../styles/sharedStyles";
import { HomePageButtonWrapper, HomePageContainer } from "./style";
import { useAppSelector } from "../../logic/redux/store/hooks";

const HomeSection = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);
  const isLoggedDetail = useAppSelector(
    (state) => state.userReducer.isLoggedDetail
  );
  return (
    <OpacityAnimation>
      <Container width="90%">
        <Wrapper>
          <HomePageContainer>
          <AnimateaChar>
              <h1>Please <b>SingUp / SignIn</b> before adding member!!</h1>
          </AnimateaChar>
           
            <HomePageButtonWrapper>
              <ParticipantBtn onClick={() => navigate(Paths.addMember)}>
              Add member
              </ParticipantBtn>
             
            </HomePageButtonWrapper>
          </HomePageContainer>
        </Wrapper>
      </Container>
    </OpacityAnimation>
  );
};

export default HomeSection;

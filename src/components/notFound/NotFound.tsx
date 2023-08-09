import {
  Container,
  OpacityAnimation,
  Wrapper,
} from "../../styles/sharedStyles";
import { NotFoundContainer } from "./style";

const NotFound = () => {
  return (
    <OpacityAnimation>
      <Container width="90%">
        <Wrapper>
          <NotFoundContainer>
            <h1>404! Page not found</h1>
          </NotFoundContainer>
        </Wrapper>
      </Container>
    </OpacityAnimation>
  );
};

export default NotFound;

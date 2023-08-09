import CustomModal from "../../CustomModal";
import { ModalHeading, ParticipantBtn } from "../../../../styles/sharedStyles";
import Button from "../../../button/Button";
import {
  ButtonWrapper,
  UserImage,
  UserImageContainer,
  UserNameDetail,
} from "./style";
import { AiOutlineUser } from "react-icons/ai";
import { useAppSelector } from "../../../../logic/redux/store/hooks";

interface I_Props {
  modalOpen(value: boolean): void;
  handleLogout?(): void;
}

const LogoutModal = ({ modalOpen, handleLogout }: I_Props) => {
  const isLoggedDetail = useAppSelector(
    (state) => state.userReducer.isLoggedDetail
  );

  return (
    <CustomModal
      bgColor="rgba(0,0,0,0.7)"
      onClickClose={() => {
        modalOpen(false);
      }}>
      <div>
        <ModalHeading>LOGOUT</ModalHeading>
        <UserImageContainer>
          <UserImage>
            <AiOutlineUser size={50} />
          </UserImage>
        </UserImageContainer>
        <UserNameDetail>{isLoggedDetail[0].userName}</UserNameDetail>
        <ButtonWrapper>
          <ParticipantBtn
            type="button"
            onClick={() => {
              modalOpen(false);
            }}
          >CANCEL</ParticipantBtn>
          <ParticipantBtn type="button" onClick={handleLogout} >LOGOUT</ParticipantBtn>
        </ButtonWrapper>
      </div>
    </CustomModal>
  );
};

export default LogoutModal;

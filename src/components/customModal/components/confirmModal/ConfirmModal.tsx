import { ModalHeading, ParticipantBtn } from "../../../../styles/sharedStyles";
import Button from "../../../button/Button";
import CustomModal from "../../CustomModal";
import { ConfirmModalButtonWrapper, ConfirmModalDescription } from "./style";

interface I_Props {
  modalOpen(value: boolean): void;
  handleDelete(): void;
}

const ConfirmModal = ({ modalOpen, handleDelete }: I_Props) => {
  return (
    <CustomModal
      bgColor="rgba(0,0,0,0.7)"
      onClickClose={() => {
        modalOpen(false);
      }}>
      <div>
        <ModalHeading>ARE YOU SURE?</ModalHeading>
        <ConfirmModalDescription>
          Do you really want to delete these record?
        </ConfirmModalDescription>
        <ConfirmModalButtonWrapper>
          <ParticipantBtn
            type="button"
            
            onClick={() => {
              modalOpen(false);
            }}
            
          >
CANCEL
          </ParticipantBtn>
          <ParticipantBtn
            type="button"
          
            onClick={handleDelete}
          
          >
            DELETE
          </ParticipantBtn>
        </ConfirmModalButtonWrapper>
      </div>
    </CustomModal>
  );
};

export default ConfirmModal;

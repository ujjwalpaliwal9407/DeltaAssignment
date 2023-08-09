import {
  CloseWrapper,
  SharedModalContainer,
  SharedModalMainContainer,
} from "./style";
import { AiFillCloseCircle } from "react-icons/ai";

interface I_CustomModalProps {
  children: React.ReactNode;
  onClickClose(): void;
  isLoading?: boolean;
  bgColor?: string;
}

const CustomModal = ({
  children,
  onClickClose,
  isLoading,
  bgColor,
}: I_CustomModalProps) => {
  return (
    <div>
      <SharedModalMainContainer bgColor={bgColor}>
        <SharedModalContainer>
          {children}
          {!isLoading && (
            <CloseWrapper onClick={onClickClose}>
              <AiFillCloseCircle size={25} />
            </CloseWrapper>
          )}
        </SharedModalContainer>
      </SharedModalMainContainer>
    </div>
  );
};

export default CustomModal;

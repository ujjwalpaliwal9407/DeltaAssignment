import { ButtonContainer } from "./style";
interface I_ButtonProps {
  text: string;
  onClick?(): void;
  type: string;
  bgColor?: string;
}

const Button = ({ onClick, text, type, bgColor }: I_ButtonProps) => {
  return (
    <ButtonContainer type={type} onClick={onClick} bgColor={bgColor}>
      {text}
    </ButtonContainer>
  );
};

export default Button;

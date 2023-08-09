import { keyframes, styled } from "styled-components";
import { Field } from "formik";
export const Container = styled.div<any>`
  position: relative;
  width: ${(props) => (props.width ? props.width : "100%")};
  padding-right: var(1.5rem, 0.75rem);
  padding-left: var(1.5rem, 0.75rem);
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 576px) {
    max-width: 90%;
  }
  @media (min-width: 768px) {
    max-width: 90%;
  }
  @media (min-width: 992px) {
    max-width: 90%;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
  @media (min-width: 1400px) {
    max-width: 1320px;
  }
`;

export const opacityAnimation = keyframes`
0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const OpacityAnimation = styled.div<any>`
  animation: ${opacityAnimation} 1s;
`;

export const Wrapper = styled.div`
  padding: 100px 0;
`;

export const SkeletonLoadingAnimation = () => keyframes`
  0% {
    background:#2b3641
  }
  100% {
    background: #7A798A;
  }
`;

export const ModalHeading = styled.div`
  font-size: 24px;
  color: #fff;
  font-weight: 600;
  text-align: center;
`;

export const InputFieldMainWrapper = styled.div``;
export const InputLabel = styled.label`
  display: block;
  font-size: 18px;
  color: #fff;
  margin: 6px 0;
`;

export const InputFieldWrapper = styled.div`
  position: relative;
`;

export const InputField = styled(Field)`
  height: 45px;
  width: 100%;
  outline: none;
  border-radius: 10px;
  border: none;
  box-sizing: border-box;
  background-color: #fff;
  color: #000;
  font-size: 18px;
  padding: 0 26px;
`;
export const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 20px;
`;
export const PasswordHideUnHideContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 16px;
  display: flex;
  cursor: pointer;
`;
export const ErrorMessageText = styled.div`
  color: #ff0000;
  font-size: 16px;
`;
const glowing = keyframes`
0% { background-position: 0 0; }
50% { background-position: 400% 0; }
100% { background-position: 0 0; }
`
export const ParticipantBtn = styled.button`
  width: auto;
  height: 44px;
  border: none;
  outline: none;
  color: white;
  background: #e718dc;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 30px;
  text-align: center;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  @media (max-width: 750px) {
    height: 34px;
    font-size: 12px;
    line-height: 14px;
  }

  @media (max-width: 480px) {
    height: 24px;
    font-size: 9px;
    line-height: 8px;
  }

  &:before {
    content: '';
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: ${glowing} 20s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    border-radius: 30px;
  }

  &:active {
    color: white;
  }

  &:active:after {
    // background: transparent;
    background: #3849ff;
  }

  &:hover:before {
    opacity: 1;
  }

  &:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #e718dc;
    left: 0;
    top: 0;
    border-radius: 30px;
  }
`

const textclip = keyframes`
to {
  background-position: 200% center;
}
`
export const AnimateaChar = styled.span`
  font-family: 'Poppins';
  text-align: center;
  background-image: linear-gradient(-225deg, #3849ff 0%, #9747ff 29%, #d314ea 67%, #fe010c 100%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${textclip} 2s linear infinite;
  font-size: 19px;
  word-break: break-all;
  @media (max-width: 750px) {
    font-size: 12px;
  }
`

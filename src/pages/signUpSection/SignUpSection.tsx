import CustomModal from "../../components/customModal/CustomModal";
import {
  ButtonWrapper,
  ErrorMessageText,
  InputField,
  InputFieldMainWrapper,
  InputFieldWrapper,
  InputLabel,
  ModalHeading,
  ParticipantBtn,
  PasswordHideUnHideContainer,
} from "../../styles/sharedStyles";
import Button from "../../components/button/Button";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../routes/path";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface I_SignUpForm {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  userName: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUpSection = () => {
  const navigate = useNavigate();
  const [isPasswordHide, setPasswordHide] = useState<boolean>(false);
  const [isConfirmPasswordHide, setConfirmPasswordHide] =
    useState<boolean>(false);

  const initialValues: I_SignUpForm = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmitForm = (
    newUser: I_SignUpForm,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem("users")!) || [];
      const userExist = existingUsers.find(
        (value: I_SignUpForm) => value.email === newUser.email
      );
      if (userExist) {
        alert("User already exist!");
      } else {
        localStorage.setItem(
          "users",
          JSON.stringify([...existingUsers, newUser])
        );
        alert("Successfully signup completed ");
        navigate(Paths.signIn);
        resetForm();
      }
    } catch (e) {
      console.log(e);
      resetForm();
    }
  };

  return (
    <div>
      <CustomModal
        onClickClose={() => {
          navigate(Paths.home);
        }}>
        <div>
          <ModalHeading>SIGN UP</ModalHeading>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmitForm}
            validationSchema={validationSchema}>
            <Form>
              <InputFieldMainWrapper>
                <InputLabel>UserName</InputLabel>
                <InputFieldWrapper>
                  <InputField
                    type="text"
                    placeholder="UserName"
                    name="userName"
                  />
                </InputFieldWrapper>
                <ErrorMessageText>
                  <ErrorMessage name="userName" />
                </ErrorMessageText>
              </InputFieldMainWrapper>
              <InputFieldMainWrapper>
                <InputLabel>Email</InputLabel>
                <InputFieldWrapper>
                  <InputField type="text" placeholder="Email" name="email" />
                </InputFieldWrapper>
                <ErrorMessageText>
                  <ErrorMessage name="email" />
                </ErrorMessageText>
              </InputFieldMainWrapper>
              <InputFieldMainWrapper>
                <InputLabel>Password</InputLabel>
                <InputFieldWrapper>
                  <InputField
                    type={isPasswordHide ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                  />
                  <PasswordHideUnHideContainer
                    onClick={() => setPasswordHide(!isPasswordHide)}>
                    {isPasswordHide ? (
                      <AiFillEye color="#000" size={25} />
                    ) : (
                      <AiFillEyeInvisible color="#000" size={25} />
                    )}
                  </PasswordHideUnHideContainer>
                </InputFieldWrapper>
                <ErrorMessageText>
                  <ErrorMessage name="password" />
                </ErrorMessageText>
              </InputFieldMainWrapper>
              <InputFieldMainWrapper>
                <InputLabel>Confirm Password</InputLabel>
                <InputFieldWrapper>
                  <InputField
                    type={isConfirmPasswordHide ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                  />
                  <PasswordHideUnHideContainer
                    onClick={() =>
                      setConfirmPasswordHide(!isConfirmPasswordHide)
                    }>
                    {isConfirmPasswordHide ? (
                      <AiFillEye color="#000" size={25} />
                    ) : (
                      <AiFillEyeInvisible color="#000" size={25} />
                    )}
                  </PasswordHideUnHideContainer>
                </InputFieldWrapper>
                <ErrorMessageText>
                  <ErrorMessage name="confirmPassword" />
                </ErrorMessageText>
              </InputFieldMainWrapper>
              <ButtonWrapper>
                <ParticipantBtn type="submit" >Sign up</ParticipantBtn>
              </ButtonWrapper>
            </Form>
          </Formik>
        </div>
      </CustomModal>
    </div>
  );
};

export default SignUpSection;

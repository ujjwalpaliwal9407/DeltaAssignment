import { useState } from "react";
import Button from "../../components/button/Button";
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
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../routes/path";
import { Formik, Form, ErrorMessage } from "formik";
import { useAppDispatch } from "../../logic/redux/store/hooks";
import { setLoggedDetail, setLoggedIn } from "../../logic/redux/action/action";
import * as Yup from "yup";

interface I_Props {
  email: string;
  password: string;
}

interface I_SignUpForm {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignInSection = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isPasswordHide, setPasswordHide] = useState<boolean>(false);

  const initialValues: I_Props = {
    email: "",
    password: "",
  };

  const handleSubmitForm = (
    user: I_Props,
    { resetForm }: { resetForm: () => void }
  ) => {
    const { email, password } = user;
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (user: I_SignUpForm) =>
          user.email === email && user.password === password
      );
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        const currentUsers = JSON.parse(
          localStorage.getItem("currentUser") || "[]"
        );

        dispatch(setLoggedIn(true));
        dispatch(
          setLoggedDetail([
            {
              userName: currentUsers?.userName,
              email: currentUsers?.email,
            },
          ])
        );
        navigate(Paths.addMember);
      } else {
        alert("Invalid username or password.");
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
          <ModalHeading>SIGN IN</ModalHeading>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmitForm}
            validationSchema={validationSchema}>
            <Form>
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
              <ButtonWrapper>
                <ParticipantBtn type="submit" >Sign in</ParticipantBtn>
              </ButtonWrapper>
            </Form>
          </Formik>
        </div>
      </CustomModal>
    </div>
  );
};

export default SignInSection;

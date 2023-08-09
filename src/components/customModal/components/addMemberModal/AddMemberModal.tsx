import {
  ErrorMessageText,
  InputField,
  InputFieldMainWrapper,
  InputFieldWrapper,
  InputLabel,
  ModalHeading,
  ParticipantBtn,
} from "../../../../styles/sharedStyles";
import { getCurrentDate } from "../../../../utils/utils";
import Button from "../../../button/Button";
import CustomModal from "../../CustomModal";
import {
  ButtonWrapper,
  DropDownContent,
  DropDownContentContainer,
  DropDownLabel,
  DropDownLabelContainer,
  DropDownMainContainer,
} from "./style";
import { Formik, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import * as Yup from "yup";

interface I_Props {
  modalOpen(value: boolean): void;
  isEditable?: boolean;
  isIdSelected?: string;
}

interface I_AddMemberProps {
  name: string;
  company: string;
  status: string;
  notes: string;
}

interface I_MemberDetail {
  _id: string;
  name: string;
  company: string;
  status: string;
  lastUpdated: string;
  notes: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  company: Yup.string().required("Company is required"),
  status: Yup.string().required("Status is required"),
  notes: Yup.string().required("Notes is required"),
});

const AddMemberModal = ({ modalOpen, isEditable, isIdSelected }: I_Props) => {
  const [savedMemberData, setSavedMemberData] = useState<I_MemberDetail[]>([]);
  const [isStatusDropDownOpen, setStatusDropDownOpen] =
    useState<boolean>(false);
  const [statusValue, setStatusValue] = useState<string>("");
  const initialValues = {
    name: "",
    company: "",
    status: "",
    notes: "",
  };
  const savedValue = {
    name: savedMemberData[0]?.name,
    company: savedMemberData[0]?.company,
    status: savedMemberData[0]?.status,
    notes: savedMemberData[0]?.notes,
  };
  console.log(" savedMemberData[0]?.status", savedMemberData[0]?.status);

  useEffect(() => {
    if (isEditable) {
      const existingMember = JSON.parse(localStorage.getItem("member")!) || [];
      const filterData = existingMember.filter(
        (value: I_MemberDetail) => value._id === isIdSelected
      );
      setSavedMemberData(filterData);
    }
  }, []);

  const handleFormSubmit = (
    addMember: I_AddMemberProps,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      if (isEditable) {
        const editMemberData = {
          _id: String(Date.now()),
          name: addMember.name,
          company: addMember.company,
          status: addMember.status,
          lastUpdated: getCurrentDate(),
          notes: addMember.notes,
        };
        const existingMember =
          JSON.parse(localStorage.getItem("member")!) || [];
        const filterData = existingMember.filter(
          (value: I_MemberDetail) => value._id !== isIdSelected
        );
        localStorage.setItem(
          "member",
          JSON.stringify([...filterData, editMemberData])
        );
        modalOpen(false);
      } else {
        const addMemberData = {
          _id: String(Date.now()),
          name: addMember.name,
          company: addMember.company,
          status: addMember.status,
          lastUpdated: getCurrentDate(),
          notes: addMember.notes,
        };
        const existingMember =
          JSON.parse(localStorage.getItem("member")!) || [];
        localStorage.setItem(
          "member",
          JSON.stringify([...existingMember, addMemberData])
        );
        modalOpen(false);
      }
    } catch (e) {
      console.log(e);
      resetForm();
    }
  };

  return (
    <div>
      <CustomModal
        bgColor="rgba(0,0,0,0.7)"
        onClickClose={() => {
          modalOpen(false);
        }}>
        <div>
          <ModalHeading>{isEditable ? "EDIT" : "ADD"} MEMBERS</ModalHeading>

          <Formik
            initialValues={isEditable ? savedValue : initialValues}
            onSubmit={handleFormSubmit}
            enableReinitialize={true}
            validationSchema={validationSchema}>
            {({ setFieldValue }) => (
              <Form>
                <InputFieldMainWrapper>
                  <InputLabel>Name</InputLabel>
                  <InputFieldWrapper>
                    <InputField type="text" placeholder="Name" name="name" />
                  </InputFieldWrapper>
                  <ErrorMessageText>
                    <ErrorMessage name="name" />
                  </ErrorMessageText>
                </InputFieldMainWrapper>
                <InputFieldMainWrapper>
                  <InputLabel>Company</InputLabel>
                  <InputFieldWrapper>
                    <InputField
                      type="text"
                      placeholder="Company"
                      name="company"
                    />
                  </InputFieldWrapper>
                  <ErrorMessageText>
                    <ErrorMessage name="company" />
                  </ErrorMessageText>
                </InputFieldMainWrapper>
                <InputFieldMainWrapper>
                  <InputLabel>Status</InputLabel>
                  <DropDownMainContainer>
                    <DropDownLabelContainer
                      onClick={() =>
                        setStatusDropDownOpen(!isStatusDropDownOpen)
                      }>
                      <DropDownLabel>
                        {statusValue ? statusValue : "Status"}
                      </DropDownLabel>
                      <div style={{ display: "flex" }}>
                        <IoIosArrowDown />
                      </div>
                    </DropDownLabelContainer>
                    {isStatusDropDownOpen && (
                      <DropDownContentContainer>
                        <DropDownContent
                          onClick={() => {
                            setStatusValue("Active");
                            setFieldValue("status", "Active");
                            setStatusDropDownOpen(false);
                          }}>
                          Active
                        </DropDownContent>
                        <DropDownContent
                          onClick={() => {
                            setStatusValue("Closed");
                            setFieldValue("status", "Closed");
                            setStatusDropDownOpen(false);
                          }}>
                          Closed
                        </DropDownContent>
                      </DropDownContentContainer>
                    )}
                  </DropDownMainContainer>
                  <ErrorMessageText>
                    <ErrorMessage name="status" />
                  </ErrorMessageText>
                </InputFieldMainWrapper>
                <InputFieldMainWrapper>
                  <InputLabel>Notes</InputLabel>
                  <InputFieldWrapper>
                    <InputField type="text" placeholder="Notes" name="notes" />
                  </InputFieldWrapper>
                  <ErrorMessageText>
                    <ErrorMessage name="notes" />
                  </ErrorMessageText>
                </InputFieldMainWrapper>
                <ButtonWrapper>
                  <ParticipantBtn
                    type="button"
                    onClick={() => {
                      modalOpen(false);
                    }}
                  >
            Cancel
                  </ParticipantBtn>
                  <ParticipantBtn type="submit" >{isEditable ? "Edit" : "Add"}</ParticipantBtn>
                </ButtonWrapper>
              </Form>
            )}
          </Formik>
        </div>
      </CustomModal>
    </div>
  );
};

export default AddMemberModal;

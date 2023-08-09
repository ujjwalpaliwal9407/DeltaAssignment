import { useState, useEffect } from "react";
import Button from "../../components/button/Button";
import ConfirmModal from "../../components/customModal/components/confirmModal/ConfirmModal";
import {
  Container,
  OpacityAnimation,
  ParticipantBtn,
  Wrapper,
} from "../../styles/sharedStyles";
import {
  ActionButtonContainer,
  FilterContainer,
  FilterContent,
  FilterContentContainer,
  FilterLabelContainer,
  FilterMainContainer,
  MemberFlex,
  MemberSectionButtonWrapper,
  MemberSectionContainer,
  MemberSectionHeading,
  MemberSectionTableContainer,
  MemberSectionTableContent,
  MemberSectionTableHeading,
} from "./style";
import AddMemberModal from "../../components/customModal/components/addMemberModal/AddMemberModal";
import { handlePrecision } from "../../utils/utils";
interface I_MemberDetail {
  _id: string;
  name: string;
  company: string;
  status: string;
  lastUpdated: string;
  notes: string;
}

const MemberSection = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] =
    useState<boolean>(false);
  const [isEditMemberModalOpen, setIsEditMemberModalOpen] =
    useState<boolean>(false);
  const [memberDetail, setMemberDetail] = useState<I_MemberDetail[]>([]);
  const [isIdSelected, setIdSelected] = useState<string>("");
  const [isStatusPopUpOpen, setIsStatusPopUpOpen] = useState<boolean>(false);
  const [statusSelected, setStatusSelected] = useState<string>("Show all");
  const [isCompanyPopUpOpen, setIsCompanyPopUpOpen] = useState<boolean>(false);
  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState<any>({});
  const [companyData, setCompanyData] = useState<any>([]);
  const [allCompanyData, _setAllCompanyData] = useState(
    JSON.parse(localStorage.getItem("member")!)
  );
  const [finalFilterValue, setFinalFilterValue] = useState<any>();
  const [filterValue, setFilterValue] = useState<any>();

  const handleDeleteMember = () => {
    const existingMember = JSON.parse(localStorage.getItem("member")!) || [];
    const filterMemberData = existingMember.filter(
      (value: I_MemberDetail) => value._id !== isIdSelected
    );
    localStorage.setItem("member", JSON.stringify(filterMemberData));
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    _setAllCompanyData(JSON.parse(localStorage.getItem("member")!));
  }, [memberDetail]);

  useEffect(() => {
    const initialCheckboxes: any = {};
    if (allCompanyData) {
      const idArr: string[] = [];
      const uniqueData = allCompanyData.filter((item: any) => {
        if (!idArr.includes(item.company)) {
          idArr.push(item.company);
          return true;
        }
        return false;
      });
      setCompanyData(uniqueData);

      for (let i = 0; i < uniqueData.length; i++) {
        initialCheckboxes[`${uniqueData?.[i]?.company}`] = false;
      }

      setCheckboxes(initialCheckboxes);
    }
  }, [allCompanyData]);

  useEffect(() => {
    setSelectAll(Object.values(checkboxes).every((value) => value === true));
  }, [checkboxes]);

  useEffect(() => {
    const storedData = localStorage.getItem("member");
    if (storedData) {
      const member = JSON.parse(storedData);
      setMemberDetail(member);
    }
  }, [isAddMemberModalOpen, isDeleteModalOpen, isEditMemberModalOpen]);

  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event.target;
    setCheckboxes((prevCheckboxes: any) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));
    setSelectAll(false);
  };

  const handleSelectAll = (event: any) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setCheckboxes((prevCheckboxes: any) => {
      const updatedCheckboxes: any = {};
      Object.keys(prevCheckboxes).forEach((checkbox) => {
        updatedCheckboxes[checkbox] = isChecked;
      });
      return updatedCheckboxes;
    });
  };

  useEffect(() => {
    const selectedCheckboxes = Object.entries(checkboxes)
      .map(([key, value]) => ({
        company: key,
        value,
      }))
      .filter((value) => value?.value === true);
    const updatedObject2: any = selectedCheckboxes.map((selected) => {
      const { company, value } = selected;
      const matchingRecord = companyData.find(
        (record: any) => record.company === company
      );
      if (matchingRecord) {
        return {
          company,
          value,
          status: matchingRecord.status, // Appending the "status" key and its value
        };
      }
      return selected;
    });
    setFinalFilterValue(updatedObject2);
  }, [checkboxes]);

  useEffect(() => {
    let data: any = [];
    if (finalFilterValue?.length === 0) {
      data = memberDetail;
    } else {
      const companyNamesInObj2 = finalFilterValue?.map(
        (item: any) => item.company
      );

      const filteredObj1 = memberDetail?.filter((item) =>
        statusSelected === "Show all"
          ? companyNamesInObj2.includes(item.company)
          : companyNamesInObj2.includes(item.company) &&
            item.status.toLocaleLowerCase() ===
              statusSelected.toLocaleLowerCase()
      );
      data = filteredObj1;
    }
    setFilterValue(data);
  }, [companyData, finalFilterValue, statusSelected]);

  return (
    <div>
      <OpacityAnimation>
        <Container width="90%">
          <Wrapper>
            <MemberSectionContainer>
              <MemberSectionHeading>Team Member</MemberSectionHeading>
              <MemberSectionButtonWrapper>
                <ParticipantBtn
                  type="button"
                  onClick={() => {
                    setIsAddMemberModalOpen(true);
                  }}
                >
                Add Member
                </ParticipantBtn>
              </MemberSectionButtonWrapper>
            </MemberSectionContainer>
            <FilterMainContainer>
              <FilterContainer>
                <FilterLabelContainer
                  onClick={() => setIsCompanyPopUpOpen(!isCompanyPopUpOpen)}>
                  Company({finalFilterValue?.length})
                </FilterLabelContainer>
                {isCompanyPopUpOpen && (
                  <FilterContentContainer>
                    <FilterContent>
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />{" "}
                      Select all
                    </FilterContent>
                    {Object.keys(checkboxes).map(
                      (checkbox: any, index: number) => {
                        return (
                          <FilterContent>
                            <label key={index}>
                              <input
                                type="checkbox"
                                name={checkbox}
                                checked={checkboxes[checkbox]}
                                onChange={handleCheckboxChange}
                              />
                              &nbsp;
                              {handlePrecision(companyData[index]?.company, 10)}
                            </label>
                          </FilterContent>
                        );
                      }
                    )}
                  </FilterContentContainer>
                )}
              </FilterContainer>
              <FilterContainer>
                <FilterLabelContainer
                  onClick={() => setIsStatusPopUpOpen(!isStatusPopUpOpen)}>
                  {statusSelected
                    ? statusSelected === "Show all"
                      ? "Show all"
                      : statusSelected
                    : "Status"}
                </FilterLabelContainer>
                {isStatusPopUpOpen && (
                  <FilterContentContainer>
                    <FilterContent
                      onClick={() => {
                        setIsStatusPopUpOpen(!isStatusPopUpOpen);
                        setStatusSelected("Show all");
                      }}>
                      Show all
                    </FilterContent>
                    <FilterContent
                      onClick={() => {
                        setIsStatusPopUpOpen(!isStatusPopUpOpen);
                        setStatusSelected("Active");
                      }}>
                      Active
                    </FilterContent>
                    <FilterContent
                      onClick={() => {
                        setStatusSelected("Closed");
                        setIsStatusPopUpOpen(!isStatusPopUpOpen);
                      }}>
                      Closed
                    </FilterContent>
                  </FilterContentContainer>
                )}
              </FilterContainer>
            </FilterMainContainer>
            <MemberSectionTableContainer>
              <MemberSectionTableHeading>
                <MemberFlex>
                  <input type="checkbox" />
                </MemberFlex>
                <div>Name</div>
                <div>Company</div>
                <div>Status </div>
                <div>Last Updated</div>
                <div>Notes</div>
                <div>Action</div>
              </MemberSectionTableHeading>
              {filterValue?.map((value: I_MemberDetail) => (
                <MemberSectionTableContent key={value?._id}>
                  <MemberFlex>
                    <input type="checkbox" />
                  </MemberFlex>
                  <div>{handlePrecision(value?.name, 15)}</div>
                  <div>{handlePrecision(value?.company, 15)}</div>
                  <div>{value?.status}</div>
                  <div>{value?.lastUpdated}</div>
                  <div>{handlePrecision(value?.notes, 15)}</div>
                  <ActionButtonContainer>
                    <ParticipantBtn
                      type="button"
                      onClick={() => {
                        setIdSelected(value?._id);
                        setIsEditMemberModalOpen(true);
                      }}
                      
                    >EDIT</ParticipantBtn>
                    <ParticipantBtn
                     
                      type="button"
                      onClick={() => {
                        setIdSelected(value?._id);
                        setIsDeleteModalOpen(true);
                      }}
                      
                    >DELETE</ParticipantBtn>
                  </ActionButtonContainer>
                </MemberSectionTableContent>
              ))}
              {filterValue?.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "50px",
                    color: "#fff",
                  }}>
                  <h1>No Data Found</h1>
                </div>
              )}
            </MemberSectionTableContainer>
          </Wrapper>
        </Container>
      </OpacityAnimation>
      {isDeleteModalOpen && (
        <ConfirmModal
          modalOpen={setIsDeleteModalOpen}
          handleDelete={handleDeleteMember}
        />
      )}
      {isAddMemberModalOpen && (
        <AddMemberModal modalOpen={setIsAddMemberModalOpen} />
      )}
      {isEditMemberModalOpen && (
        <AddMemberModal
          modalOpen={setIsEditMemberModalOpen}
          isEditable={true}
          isIdSelected={isIdSelected}
        />
      )}
    </div>
  );
};

export default MemberSection;

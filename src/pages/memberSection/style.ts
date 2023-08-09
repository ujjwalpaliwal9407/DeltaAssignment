import styled from "styled-components";

export const MemberSectionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const MemberSectionHeading = styled.div`
  font-size: 28px;
  color: #fff;
  font-weight: 600;
`;

export const MemberSectionButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 150px;
`;

export const MemberSectionTableContainer = styled.div``;
export const MemberSectionTableHeading = styled.div`
  display: grid;
  grid-template-columns: auto repeat(6, 1fr);
  grid-gap: 5px;
  justify-items: center;
  align-items: center;
  background-color: #ececec;
  padding: 10px 5px;
  font-size: 18px;
  color: #000;
  border-radius: 6px;
  font-weight: 600;
`;
export const MemberSectionTableContent = styled.div`
  display: grid;
  grid-template-columns: auto repeat(6, 1fr);
  grid-gap: 5px;
  justify-items: center;
  align-items: center;
  font-size: 16px;
  color: #000;
  border-radius: 6px;
  background-color: #ececec;
  margin: 20px 0;
  padding: 10px 5px;
  box-sizing: border-box;
`;

export const ActionButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 80px 80px;
  grid-gap: 6px;
`;

export const FilterMainContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin: 30px 0;
`;
export const FilterContainer = styled.div`
  position: relative;
`;

export const FilterLabelContainer = styled.div`
  height: 45px;
  width: 150px;
  padding: 0 20px;
  background-color: #ececec;
  border-radius: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  color: #000;
  font-weight: 600;
`;

export const FilterContentContainer = styled.div`
  background-color: #ececec;
  width: 150px;
  padding: 10px 20px;
  border-radius: 10px;
  margin-top: 10px;
  position: absolute;
  top: 45px;
  left: 0;
  border: 1px solid #000;
`;
export const FilterContent = styled.div`
  font-size: 18px;
  margin: 10px 0;
  font-weight: 600;
`;

export const MemberFlex = styled.div`
  display: flex;
`;

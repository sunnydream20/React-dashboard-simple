import * as Styled from "./ReviewForm.styled";
import { Space } from "antd";
import { useDevice } from "../../../../Utils/Hooks/useDevice";
import { useDispatch, useSelector } from "react-redux";

import {
  selectKycVerification,
  selectProfile,
} from "../../../../Redux/selectors";

export const ReviewForm: React.FC = () => {
  const kycFormData = useSelector(selectKycVerification);
  const profileFormData = useSelector(selectProfile);

  const firstName = profileFormData.firstName || "";
  const lastName = profileFormData.lastName || "";
  const country = kycFormData.country;
  const gender = kycFormData.gender;
  const address = kycFormData.address;
  const occupation = kycFormData.occupation;
  const dateOfBirth = kycFormData.dateOfBirth;
  const documentType = kycFormData.documentType;
  const documents = kycFormData.documents;

  const handleValuesChange = (changedValues, allValues) => {
    console.log(allValues);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const device = useDevice();
  return (
    <div>
      <Styled.Heading>Review your Information</Styled.Heading>
      <Styled.ContainerWrapper>
        <Styled.Container>
          <Space
            size={device?.isBreakpoint("MD") ? 32 : 16}
            direction={device?.isBreakpoint("MD") ? "horizontal" : "vertical"}
          >
            <div>
              <Styled.FieldTitle>First Name</Styled.FieldTitle>
              <Styled.FieldValue>{firstName}</Styled.FieldValue>
            </div>
            <div>
              <Styled.FieldTitle>Last Name</Styled.FieldTitle>
              <Styled.FieldValue>{lastName}</Styled.FieldValue>
            </div>
          </Space>
          <Space
            size={device?.isBreakpoint("MD") ? 32 : 16}
            direction={device?.isBreakpoint("MD") ? "horizontal" : "vertical"}
          >
            <div>
              <Styled.FieldTitle>Date of Birth</Styled.FieldTitle>
              <Styled.FieldValue>{occupation}</Styled.FieldValue>
            </div>
            <div>
              <Styled.FieldTitle>Gender</Styled.FieldTitle>
              <Styled.FieldValue>{gender}</Styled.FieldValue>
            </div>
          </Space>
        </Styled.Container>
        <Styled.Container>
          <Space
            size={device?.isBreakpoint("MD") ? 32 : 16}
            direction={device?.isBreakpoint("MD") ? "horizontal" : "vertical"}
          >
            <div>
              <Styled.FieldTitle>Country</Styled.FieldTitle>
              <Styled.FieldValue>{country}</Styled.FieldValue>
            </div>
            <div>
              <Styled.FieldTitle>Occupation</Styled.FieldTitle>
              <Styled.FieldValue>{dateOfBirth}</Styled.FieldValue>
            </div>
          </Space>

          <Space
            size={device?.isBreakpoint("MD") ? 32 : 16}
            direction={device?.isBreakpoint("MD") ? "horizontal" : "vertical"}
          >
            <div>
              <Styled.FieldTitle>Address</Styled.FieldTitle>
              <Styled.FieldValue>{address}</Styled.FieldValue>
            </div>
            <div>
              <Styled.FieldTitle>Document Type</Styled.FieldTitle>
              <Styled.FieldValue>{documentType}</Styled.FieldValue>
            </div>
          </Space>
        </Styled.Container>
        <Styled.UploadSection>
          <Styled.FieldTitle> Uploaded Documents</Styled.FieldTitle>
          <Styled.ImgGrp>
            {documents?.map((item, index) => (
              <Styled.UploadImg key={index} />
              // <img key={index} src=""/>
            ))}
          </Styled.ImgGrp>
        </Styled.UploadSection>
      </Styled.ContainerWrapper>
    </div>
  );
};

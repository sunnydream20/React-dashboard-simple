import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// antd
import { Button, Card } from "antd";

// components
import { PersonalInformationForm } from "./components/PersonalInformationForm/PersonalInformationForm";
import { IDVerificationForm } from "./components/IDVerificationForm/IDVerificationForm";
import { ReviewForm } from "./components/ReviewForm/ReviewForm";
import { CompleteForm } from "./components/FormStatus/CompleteForm";
import { AddYourPicturesForm } from "./components/AddYourPicturesForm/AddYourPicturesForm";
import PageTitle from "../PageTitle";

// redux
import { useUpdateKycVerificationDataMutation } from "../../Redux/slice";
import { selectKycVerification } from "../../Redux/selectors";
import { selectProfile } from "../../Redux/selectors";

// hooks
import { useDevice } from "../../Utils/Hooks/useDevice";

// styles
import * as Styled from "./KycVerification.styled";

export const KycVerification: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const device = useDevice();
  const [result, setResult] = useState(0);

  const kycRedux = useSelector(selectKycVerification);

  const profileRedux = useSelector(selectProfile);

  const [updateKycVerificationData, { isLoading }] =
    useUpdateKycVerificationDataMutation();

  const [errors, setErrors] = useState({
    dateOfBirth: "",
    occupation: "",
    address: "",
    country: "",
    documents: "",
    images: "",
  });

  const next = () => {
    let flag = false;

    if (current === 0) {
      let tempError = {
        dateOfBirth: "",
        occupation: "",
        address: "",
      };
      if (!kycRedux.dateOfBirth) {
        flag = true;
        tempError.dateOfBirth = "Please insert date of birth";
      }
      if (!kycRedux.occupation && !kycRedux.occupation.length) {
        flag = true;
        tempError.occupation = "Please insert occupation";
      }
      if (!kycRedux.address && !kycRedux.address.length) {
        flag = true;
        tempError.address = "Please insert address";
      }
      setErrors({
        ...errors,
        dateOfBirth: tempError.dateOfBirth,
        occupation: tempError.occupation,
        address: tempError.address,
      });
      if (flag) return;
    } else if (current === 1) {
      let tempError = {
        country: "",
        documents: "",
      };
      if (!kycRedux.country) {
        flag = true;
        tempError.country = "Please insert country";
      }
      if (!kycRedux.documents && !kycRedux.documents?.length) {
        flag = true;
        tempError.documents = "Please insert documents";
      }
      if (
        kycRedux.documentType !== "PASSPORT" &&
        kycRedux.documents?.length < 2
      ) {
        flag = true;
        tempError.documents = "Please insert both side of document";
      }
      setErrors({
        ...errors,
        country: tempError.country,
        documents: tempError.documents,
      });
      if (flag) return;
    } else if (current === 2) {
      if (!kycRedux.images && !kycRedux.images?.length) {
        setErrors({ ...errors, images: "Please insert your picture" });
        return;
      }
    }
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSubmitForm = async () => {
    next();

    try {
      const response = await axios.post("/api/v1/user/update/kyc", {
        dateOfBirth: kycRedux.dateOfBirth,
        gender: kycRedux.gender,
        address: kycRedux.address,
        country: kycRedux.country,
        occupation: kycRedux.occupation,
        documentType: kycRedux.documentType,
        documents: kycRedux.documents,
        images: kycRedux.images,
      });

      // if (response.result === "APPROVED") {
      //   setResult(1);
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const steps = [
    {
      content: <PersonalInformationForm errors={errors} />,
      title: "personalInformation",
    },

    {
      content: <IDVerificationForm errors={errors} />,
      title: "IDVerification",
    },
    {
      content: <AddYourPicturesForm errors={errors} />,
      title: "AddYourPicture",
    },
    {
      content: <ReviewForm />,
      title: "Review",
    },
    {
      content: <CompleteForm state={0} />,
      title: "Complete",
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: "",
  }));

  return (
    <>
      {current !== steps.length - 1 && (
        <PageTitle
          title="KYC Verification"
          description="Please complete your KYC verification to continue using our services"
        />
      )}
      <Styled.Content>
        <Styled.StepsWrapper>
          {current !== steps.length - 1 && (
            <Styled.Steps
              progressDot
              current={current}
              items={items}
              direction={device?.isBreakpoint("MD") ? "vertical" : "horizontal"}
              labelPlacement={
                device?.isBreakpoint("MD") ? "horizontal" : "vertical"
              }
              responsive={false}
            />
          )}
          <Styled.StepsContent>
            <Card>{steps[current].content}</Card>
            <Styled.BtnGroup>
              {current > 0 && current < steps.length - 1 && (
                <Styled.PreviousBtn onClick={() => prev()}>
                  Previous
                </Styled.PreviousBtn>
              )}
              {current < steps.length - 2 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
              {current === steps.length - 2 && (
                <Button type="primary" onClick={handleSubmitForm}>
                  Submit
                </Button>
              )}
            </Styled.BtnGroup>
          </Styled.StepsContent>
        </Styled.StepsWrapper>
      </Styled.Content>
    </>
  );
};

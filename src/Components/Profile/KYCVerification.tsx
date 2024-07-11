import * as Styled from "./Profile.styled.js";
import { Link } from "react-router-dom";

const KYCVerification = () => {
  return (
    <>
      <Styled.KycMainRow>
        <Styled.StyledKYCCol span={24}>
          <Styled.KycBox>
            <Styled.KycBtn type="primary">
              <Link to="/verification">Get Verified</Link>
            </Styled.KycBtn>
          </Styled.KycBox>
        </Styled.StyledKYCCol>
      </Styled.KycMainRow>
    </>
  );
};

export default KYCVerification;

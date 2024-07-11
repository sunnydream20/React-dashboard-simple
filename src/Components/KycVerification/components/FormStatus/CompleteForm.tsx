import { faHourglassHalf } from "@fortawesome/free-regular-svg-icons";

import * as Styled from "./CompleteForm.styled";

interface CompleteFormProps {
  state: number;
}

export const CompleteForm: React.FC<CompleteFormProps> = ({ state }) => {
  // 0 => pending 1 => verified 2 => declined

  return (
    <Styled.CompleteFormWrapper>
      <div>
        {state === 0 && <Styled.StyledFontAwesomeIcon icon={faHourglassHalf} />}
        {state === 1 && <Styled.StyledCheckIcon />}
        {state === 2 && <Styled.StyledCancelIcon />}

        <Styled.Heading>Verification Pending</Styled.Heading>
        <Styled.StyledDescription>
          You will receive notifications regarding the status of your KYC
          verification.
        </Styled.StyledDescription>
      </div>
    </Styled.CompleteFormWrapper>
  );
};

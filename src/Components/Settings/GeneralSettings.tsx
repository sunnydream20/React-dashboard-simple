import { Link } from "react-router-dom";
import rightArrow from "../../assets/images/red-right-arrow.svg";
import { Switch, Tooltip } from "antd";
import * as Styled from "./settings.styled.js";
import { useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import support from "../../assets/images/question.svg";

const GeneralSettings = () => {
  const [iskycDone, setiskycDone] = useState(false);
  return (
    <Styled.SettingsBox>
      <Styled.SettingsBoxH2>Profile</Styled.SettingsBoxH2>
      <div>
        {iskycDone ? (
          <Styled.CustomLink to={""}>
            <Styled.SettingsBoxPdisable>Change Name</Styled.SettingsBoxPdisable>
            <Tooltip title="Unable to Change Name,as you have Done with your kyc Verification">
              {" "}
              <Styled.TooltipImg src={support} alt="help" />
            </Tooltip>{" "}
          </Styled.CustomLink>
        ) : (
          <Styled.CustomLink to="/settings/change-name">
            <Styled.SettingsBoxP>Change Name</Styled.SettingsBoxP>
            <RightOutlined />
          </Styled.CustomLink>
        )}

        <Styled.CustomLink to="/settings/change-email">
          <Styled.SettingsBoxP>Change Email</Styled.SettingsBoxP>
          <RightOutlined />
        </Styled.CustomLink>
        <Styled.CustomLink to="/change-password">
          <Styled.SettingsBoxP>Change Password</Styled.SettingsBoxP>
          <RightOutlined />
        </Styled.CustomLink>
      </div>
    </Styled.SettingsBox>
  );
};

export default GeneralSettings;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryData } from "countries-list";

import { Col } from "antd";
import { selectProfile } from "../../Redux/selectors";
import * as Styled from "./Profile.styled";

const ProfileAbout = () => {
  const profile = useSelector(selectProfile);
  const ctData = getCountryData(profile.countryCode);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Styled.AboutMainRow gutter={[72, 72]}>
      <Col span={24}>
        <Styled.StyledUserInfo>
          <Styled.StyledProfileAvatar style={{ background: profile?.avatarBg }}>
            {profile?.firstName[0]?.toUpperCase()}
          </Styled.StyledProfileAvatar>
          <Styled.StyledNameLabel>{profile.username}</Styled.StyledNameLabel>
          <Styled.StyledLevelLabel>
            Level: {profile.investmentLevel || "A"}
          </Styled.StyledLevelLabel>
        </Styled.StyledUserInfo>
        <Styled.AboutBoxRow>
          <Styled.AboutBoxCol span={24} md={12}>
            {isLoading ? (
              <Styled.SkeletonInputCustom size="small" active />
            ) : (
              <>
                <Styled.AboutBoxH4>First Name :</Styled.AboutBoxH4>
                <Styled.AboutBoxP>{profile.firstName}</Styled.AboutBoxP>
              </>
            )}
          </Styled.AboutBoxCol>
          <Styled.AboutBoxCol2 span={24} md={12}>
            {isLoading ? (
              <Styled.SkeletonInputCustom size="small" active />
            ) : (
              <>
                <Styled.AboutBoxH4>Last Name :</Styled.AboutBoxH4>
                <Styled.AboutBoxP>{profile.lastName}</Styled.AboutBoxP>
              </>
            )}
          </Styled.AboutBoxCol2>
        </Styled.AboutBoxRow>
        <Styled.AboutBoxRow>
          <Styled.AboutBoxCol span={24} md={12}>
            {isLoading ? (
              <Styled.SkeletonInputCustom size="small" active />
            ) : (
              <>
                <Styled.AboutBoxH4>Country :</Styled.AboutBoxH4>
                <Styled.AboutBoxP>{ctData.name}</Styled.AboutBoxP>
              </>
            )}
          </Styled.AboutBoxCol>
          <Styled.AboutBoxCol2 span={24} md={12}>
            {isLoading ? (
              <Styled.SkeletonInputCustom size="small" active />
            ) : (
              <>
                <Styled.AboutBoxH4>Number :</Styled.AboutBoxH4>
                <Styled.AboutBoxP>{profile.phoneNumber}</Styled.AboutBoxP>{" "}
              </>
            )}
          </Styled.AboutBoxCol2>
        </Styled.AboutBoxRow>
        <Styled.AboutBoxRow>
          <Styled.AboutBoxCol span={24} md={12}>
            {isLoading ? (
              <Styled.SkeletonInputCustom size="small" active />
            ) : (
              <>
                <Styled.AboutBoxH4>Email :</Styled.AboutBoxH4>
                <Styled.AboutBoxP>{profile.email}</Styled.AboutBoxP>{" "}
              </>
            )}
          </Styled.AboutBoxCol>
          <Styled.AboutBoxCol2 span={24} md={12}>
            {isLoading ? (
              <Styled.SkeletonInputCustom size="small" active />
            ) : (
              <>
                <Styled.AboutBoxH4>Username :</Styled.AboutBoxH4>
                <Styled.AboutBoxP>{profile.username}</Styled.AboutBoxP>{" "}
              </>
            )}
          </Styled.AboutBoxCol2>
        </Styled.AboutBoxRow>
      </Col>
    </Styled.AboutMainRow>
  );
};

export default ProfileAbout;

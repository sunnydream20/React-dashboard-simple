import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Skeleton, Modal } from "antd";
import * as Styled from "./Rank.styled";
import axios from "axios";
import { API } from "../../Utils/api";
import RankChart from "./Charts";

import { selectProfile } from "../../Redux/selectors";
import { useSelector } from "react-redux";

const { Meta } = Card;


const MyComponent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isClaimed, setisClaimed] = useState(false);
  // const [referrals, setReferrals] = useState(0);
  const [rankData, setRankData] : any = useState({});
  const profile = useSelector(selectProfile);
  const [rankName, setRankName] = useState("");
  const [isNotClaimed, setIsNotClaimed] = useState(false);
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    callRank();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const callRank = async() => {
    const { data } = await API.get('/rank');
    setRankData(data.data);
    if (data.data && data.data.joiningDate) {
      let temp = data.data.joiningDate.toString().slice(0,10).split('-')
      let date = (Number(temp[2]) + 30) % 30;
      let month:any = ( Number(temp[1]) + Math.floor((Number(temp[2]) + 30) / 30) ) % 12;
      month = month > 10 ? month : `0${month}`;
      let year = Number(temp[0]) + Math.floor(( Number(temp[1]) + Math.floor((Number(temp[2]) + 30) / 30) ) / 12);
      temp = year + "-" + month + "-" + date;
      setEndDate(temp);
    }
  } 
  const claimAct = async () => {
    // setisClaimed(true);
    try {
      const result = await API.post('/reward/claim-reward');
      setisClaimed(true);
    } catch (error) {
      setIsNotClaimed(true);
    }
      
  }
  return (
    <>
      <Styled.RankTitle>Rank</Styled.RankTitle>
      <Styled.RankDataWrapper>
        <Styled.RankSubtitleWrapper>
          <Styled.RankSubtitle>Statistics</Styled.RankSubtitle>
        </Styled.RankSubtitleWrapper>
        <Row>
          <Col span={24} md={12}>
            <Styled.RankCol1>
              <Styled.RankDataItem>
                <Styled.RankDataLabel span={12}>
                  <h3>Current Rank</h3>
                  <span>:</span>
                </Styled.RankDataLabel>
                <Styled.RankDataValue span={12}>
                  <h3>
                    {loading ? <Skeleton.Input size="small" active /> : (rankData?.rank ? rankData?.rank.title : "N/A")}
                  </h3>
                </Styled.RankDataValue>
              </Styled.RankDataItem>
              <Styled.RankDataItem>
                <Styled.RankDataLabel span={12}>
                  <h3>Starts On</h3>
                  <span>:</span>
                </Styled.RankDataLabel>
                <Styled.RankDataValue span={12}>
                  <h3>
                    {loading ? (
                      <Skeleton.Input size="small" active />
                    ) : (
                      rankData ? rankData.joiningDate?.toString().slice(0,10) : ""
                    )}
                  </h3>
                </Styled.RankDataValue>
              </Styled.RankDataItem>
              <Styled.RankDataItem>
                <Styled.RankDataLabel span={12}>
                  <h3>Ends On</h3>
                  <span>:</span>
                </Styled.RankDataLabel>
                <Styled.RankDataValue span={12}>
                  <h3>
                    {loading ? (
                      <Skeleton.Input size="small" active />
                    ) : (
                      endDate
                    )}
                  </h3>
                </Styled.RankDataValue>
              </Styled.RankDataItem>
            </Styled.RankCol1>
          </Col>
          <Col span={24} md={12}>
            <Styled.RankCol2>
              <Styled.RankDataItem>
                <Styled.RankDataLabel span={12}>
                  <h3 className="text-left">Current Sales Revenue</h3>
                  <span>:</span>
                </Styled.RankDataLabel>
                <Styled.RankDataValue span={12}>
                  <h3>
                    {loading ? (
                      <Skeleton.Input size="small" active />
                    ) : (
                      `$${rankData?rankData.sumOfLast30DaysSales:""}`
                    )}
                  </h3>
                </Styled.RankDataValue>
              </Styled.RankDataItem>
              <Styled.RankDataItem>
                <Styled.RankDataLabel span={12}>
                  <h3 className="text-left">Direct Referrals</h3>
                  <span>:</span>
                </Styled.RankDataLabel>
                <Styled.RankDataValue span={12}>
                  <h3>
                    {loading ? <Skeleton.Input size="small" active /> : rankData?.directReferralsCount}
                  </h3>
                </Styled.RankDataValue>
              </Styled.RankDataItem>
              <Styled.RankDataItem>
                <Styled.RankDataLabel span={12}>
                  <h3 className="text-left">Meeting compliance</h3>
                  <span>:</span>
                </Styled.RankDataLabel>
                <Styled.RankDataValue span={12}>
                  <h3>
                    {loading ? <Skeleton.Input size="small" active /> : (rankData?.rank ? rankData.rank.weeklyMeetings : "N/A")}
                  </h3>
                </Styled.RankDataValue>
              </Styled.RankDataItem>
            </Styled.RankCol2>
          </Col>
        </Row>
        <Styled.ClaimRewardBtnWrapper>
          <Styled.ClaimRewardBtn
            type="primary"
            size="large"
            onClick={claimAct}
          >
            Claim
          </Styled.ClaimRewardBtn>
        </Styled.ClaimRewardBtnWrapper>
      </Styled.RankDataWrapper>
      <Styled.RankChartWrapper>
        <RankChart />
      </Styled.RankChartWrapper>
      <Modal open={isClaimed} onCancel={() => setisClaimed(false)} footer={<></>}>
        <Styled.RankDataDescription>
          <b>Congratulations!</b> You have achieved your milestone. You can
          claim your rewards.
        </Styled.RankDataDescription>
        <Styled.RankResultWrapper>
          <Styled.RankResultTitle>Rank:</Styled.RankResultTitle>
          <Styled.RankResultContent>
            {loading ? <Skeleton.Input size="small" active /> : "Leader 1"}
          </Styled.RankResultContent>
          <Styled.RankResultTitle>Reward Range:</Styled.RankResultTitle>
          <Styled.RankResultContent>
            {loading ? (
              <Skeleton.Input size="small" active />
            ) : (
              "300 - 500$"
            )}
          </Styled.RankResultContent>
        </Styled.RankResultWrapper>
      </Modal>
      <Modal open={isNotClaimed} onCancel={() => setIsNotClaimed(false)} footer={<></>}>
        <Styled.RankDataDescription>
          <b>Announcement!</b> You have already claimed.
        </Styled.RankDataDescription>
      </Modal>
    </>
  );
};

export default MyComponent;

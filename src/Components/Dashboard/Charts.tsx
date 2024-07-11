import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { Row, Col } from "antd";
import * as Styled from "./Style/Dashboard.styled";
import { ChartConfig, useChartData } from "./ChartData";

interface ChartProps {
  eChart: ChartConfig;
}

const EChart: React.FC = () => {
  const {
    chart,
    loading,
    balanceFrame,
    timeFrame,
    handleBalanceChange,
    handleTimeChange,
  } = useChartData();

  return (
    <>
      <Row justify="space-between" align={"middle"}>
        <Col className="w-100">
          <Styled.ChartHeading>Analytics</Styled.ChartHeading>
        </Col>
        <Styled.SelectCol>
          <Styled.ChartSubjectSelect
            onChange={handleBalanceChange}
            value={balanceFrame}
            options={[
              { value: "profits", label: "Profits" },
              { value: "credits", label: "Credits" },
              { value: "rewards", label: "Rewards" },
            ]}
          />
          <Styled.ChartDateSelect
            defaultValue="day"
            onChange={handleTimeChange}
            options={[
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
            ]}
          />
        </Styled.SelectCol>
      </Row>
      <div className="chart-container">
        <ReactApexChart
          className="bar-chart"
          options={chart.options}
          series={chart.series}
          type="bar"
          height={220}
        />
      </div>
    </>
  );
};

export default EChart;

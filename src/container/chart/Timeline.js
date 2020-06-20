import React from "react";
import { Chart } from "react-google-charts";
import styles from "./Timeline.module.css";
import { axisOptions } from "../../constants/constant";
const TimeLineChart = ({ chartData }) => {
  let filteredChartData = [
    ["Id", "Votes"],
    ...chartData.map((item, index) =>
      item.objectID ? [+item.objectID, item.points] : []
    ),
  ];
  return (
    <div className={styles.timeLineChart}>
      <Chart
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={filteredChartData}
        options={axisOptions}
      />
    </div>
  );
};

export default TimeLineChart;

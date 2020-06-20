import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import TimeLineChart from "../../container/chart/Timeline";
import { feedHeaderData } from "../../constants/constant";

const feedsData= [
    {
        objectID: 100,
        points:20
    },
    {
        objectID: 200,
        points:50
    },
    {
        objectID: 150,
        points:100
    }
]

describe("test news header component", () => {
  afterEach(cleanup);

  it("load chart component correctly", () => {
    const { container } = render(
        <TimeLineChart chartData={feedsData} />
    );
    expect(container).toBeInTheDocument()
  });
  
});

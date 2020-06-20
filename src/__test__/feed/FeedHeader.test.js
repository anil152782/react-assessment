import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import FeedHeader from "../../components/feed/Header";
import { feedHeaderData } from "../../constants/constant";

describe("test news header component", () => {
  afterEach(cleanup);

  it("load header items correctly", () => {
    const { getByTestId } = render(
      <table>
        <FeedHeader />
      </table>
    );
    expect(getByTestId("headerItems").children.length).toBe(
      feedHeaderData.length
    );
  });
});

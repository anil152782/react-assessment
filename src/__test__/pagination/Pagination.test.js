import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "../../components/pagination/Pagination";
import { pagination } from "../../constants/constant";

describe("test pagination component", () => {
    let paginationEvent;
  afterEach(cleanup);
  beforeEach(()=>{
 paginationEvent = jest.fn();
  })

  it("load all([pre,next]) buttons", () => {

    const { getByTestId } = render(
      <Pagination
        prebtnHidden={false}
        nextbtnHidden={false}
        paginationEvent={paginationEvent}
      />
    );
    expect(getByTestId("paginationItems").children.length).toBe(2);
  });

  it("load no([pre,next]) buttons", () => {
    const { getByTestId } = render(
      <Pagination
        prebtnHidden={true}
        nextbtnHidden={true}
        paginationEvent={paginationEvent}
      />
    );
    expect(getByTestId("paginationItems").children.length).toBe(0);
  });

  it("load one([pre,next]) buttons", () => {
    const { getByTestId, rerender, debug } = render(
      <Pagination
        prebtnHidden={true}
        nextbtnHidden={false}
        paginationEvent={paginationEvent}
      />
    );
    expect(getByTestId("paginationItems").children.length).toBe(1);
    expect(getByTestId("paginationItems").children[0]).toHaveTextContent(
      pagination.next.value
    );
    rerender(
      <Pagination
        prebtnHidden={false}
        nextbtnHidden={true}
        paginationEvent={paginationEvent}
      />
    );
    expect(getByTestId("paginationItems").children.length).toBe(1);
    expect(getByTestId("paginationItems").children[0]).toHaveTextContent(
      pagination.previous.value
    );
  });

  it("load one([pre,next]) buttons", () => {
    const { getByTestId, rerender, debug } = render(
      <Pagination
        prebtnHidden={true}
        nextbtnHidden={false}
        paginationEvent={paginationEvent}
      />
    );
    expect(getByTestId("paginationItems").children.length).toBe(1);
    expect(getByTestId("paginationItems").children[0]).toHaveTextContent(
      pagination.next.value
    );
    rerender(
      <Pagination
        prebtnHidden={false}
        nextbtnHidden={true}
        paginationEvent={paginationEvent}
      />
    );
    expect(getByTestId("paginationItems").children.length).toBe(1);
    expect(getByTestId("paginationItems").children[0]).toHaveTextContent(
      pagination.previous.value
    );
  });
  it('pagination item should click',()=>{
    const { getByTestId} = render(<Pagination
        prebtnHidden={false}
        nextbtnHidden={false}
        paginationEvent={paginationEvent}
      />);
    fireEvent.click(getByTestId("paginationItems").children[0]);
    fireEvent.click(getByTestId("paginationItems").children[1]);
    expect(paginationEvent).toHaveBeenCalledTimes(2)
   
    })
});

// Test away
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { iniialState, reducer } from "../redux/reducer";
import Controls from "../controls/Controls";
import Display from "../display/Display";
import Dashboard from "./Dashboard";

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState for the entire store that the ui is rendered with

function renderWithRedux(
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}

describe("GATE", () => {
  afterEach(cleanup);
  test("should default to unlocked and open", () => {
    const { getByTestId } = renderWithRedux(<Display />);

    // Lock Status Should be Unlocked?
    expect(getByTestId("lock-status").textContent).toBe("Unlocked");
    // Closed Status Should be Open?
    expect(getByTestId("closed-status").textContent).toBe("Open");
  });

  test("cannot be closed or opened if it is locked", () => {
    // Default to unlocked and open
    //   const {getByTestId } = render(<Display />)
    const { getByTestId } = renderWithRedux(
      <Dashboard>
        <Controls />
      </Dashboard>
    );

    expect(getByTestId("close-btn").textContent).toBe("Close Gate");

    // Find & Press button to close gate
    fireEvent.click(getByTestId("close-btn"));

    expect(getByTestId("close-btn").textContent).toBe("Open Gate");
    expect(getByTestId("lock-btn").textContent).toBe("Lock Gate");

    // Find & Press button to lock gate
    fireEvent.click(getByTestId("lock-btn"));
    expect(getByTestId("lock-btn").textContent).toBe("Unlock Gate");

    // Check if Close Btn is disabled -- cannot be closed or opened
    expect(getByTestId("close-btn")).toHaveAttribute("disabled");
  });
});

describe("DASHBOARD", () => {
  afterEach(cleanup);

  test("shows the controls and display", () => {
    const { getByTestId } = renderWithRedux(<Dashboard />);

    // Controls component rendered?
    expect(getByTestId("controls-component")).toBeTruthy();
    // Display component rendered?
    expect(getByTestId("display-component")).toBeTruthy();
  });
});

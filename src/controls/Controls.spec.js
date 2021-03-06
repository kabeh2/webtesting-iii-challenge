import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { initialState, reducer } from "../redux/reducer";
import "@testing-library/jest-dom/extend-expect";
import Controls from "./Controls";
import Dashboard from "../dashboard/Dashboard";

// Test away!
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

describe("CONTROLS COMPONENT", () => {
  afterEach(cleanup);
  test("provide buttons to toggle the closed and locked states.", () => {
    const { getByTestId } = renderWithRedux(<Controls />);

    const lockBtn = getByTestId("lock-btn");
    const closeBtn = getByTestId("close-btn");

    // Check that each button is rendered to the DOM
    expect(lockBtn).toBeTruthy();
    expect(closeBtn).toBeTruthy();
  });

  test("buttons' text changes to reflect the state the door will be in if clicked", () => {
    const { getByTestId } = renderWithRedux(
      <Dashboard>
        <Controls />
      </Dashboard>
    );

    const lockBtn = getByTestId("lock-btn");
    const closeBtn = getByTestId("close-btn");

    // Assuming on default, gate is open and unlocked
    expect(lockBtn.innerHTML).toBe("Lock Gate");
    expect(closeBtn.innerHTML).toBe("Close Gate");

    // Click Close Btn one time
    fireEvent.click(closeBtn);
    expect(lockBtn.innerHTML).toBe("Lock Gate");
    expect(closeBtn.innerHTML).toBe("Open Gate");

    // Click Lock Btn one time
    fireEvent.click(lockBtn);
    expect(lockBtn.innerHTML).toBe("Unlock Gate");
    expect(closeBtn.innerHTML).toBe("Open Gate");
  });

  test("the closed toggle button is disabled if the gate is locked", () => {
    const { getByTestId } = renderWithRedux(
      <Dashboard>
        <Controls />
      </Dashboard>
    );

    const lockBtn = getByTestId("lock-btn");
    const closeBtn = getByTestId("close-btn");

    // Default should NOT have the closed button disabled
    expect(closeBtn).not.toHaveAttribute("disabled");

    // Click Close Btn and then lock Btn to disable Close Btn
    fireEvent.click(closeBtn);
    fireEvent.click(lockBtn);

    expect(closeBtn).toHaveAttribute("disabled");
  });

  test("the locked toggle button is disabled if the gate is open", () => {
    const { getByTestId } = renderWithRedux(
      <Dashboard>
        <Controls />
      </Dashboard>
    );

    // Default should have gate open and lock Btn disabled
    const lockBtn = getByTestId("lock-btn");
    expect(lockBtn).toHaveAttribute("disabled");

    // Toggle Close btn to ensure disabled gets removed
    const closeBtn = getByTestId("close-btn");
    fireEvent.click(closeBtn);
    expect(lockBtn).not.toHaveAttribute("disabled");

    // Toggle Close btn again to ensure disabled is there again
    fireEvent.click(closeBtn);
    expect(lockBtn).toHaveAttribute("disabled");
  });
});

// Test away
import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Controls from "../controls/Controls";
import Display from "../display/Display";
import Dashboard from "./Dashboard";

describe("GATE", () => {
  afterEach(cleanup);
  test("should default to unlocked and open", () => {
    const { getByTestId } = render(<Display />);

    // Lock Status Should be Unlocked?
    expect(getByTestId("lock-status").textContent).toBe("Unlocked");
    // Closed Status Should be Open?
    expect(getByTestId("closed-status").textContent).toBe("Open");
  });

  test("cannot be closed or opened if it is locked", () => {
    // Default to unlocked and open
    //   const {getByTestId } = render(<Display />)
    const { getByTestId } = render(
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
    const { getByTestId } = render(<Dashboard />);

    // Controls component rendered?
    expect(getByTestId("controls-component")).toBeTruthy();
    // Display component rendered?
    expect(getByTestId("display-component")).toBeTruthy();
  });
});

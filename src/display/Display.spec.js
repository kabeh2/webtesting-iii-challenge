import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Controls from "../controls/Controls";
import Display from "./Display";
import Dashboard from "../dashboard/Dashboard";

// Test away!

describe("DISPLAY COMPONENT", () => {
  afterEach(cleanup);
  test("displays if gate is open/closed and if it is locked/unlocked", () => {
    const { getByTestId } = render(
      <Dashboard>
        <Display />
        <Controls />
      </Dashboard>
    );

    // Display Component Renders
    expect(getByTestId("display-component")).toBeTruthy();
  });

  test("displays 'Closed' if the closed prop is true and 'Open' if otherwise", () => {
    const { getByTestId } = render(
      <Dashboard>
        <Display />
        <Controls />
      </Dashboard>
    );

    // Displays open if closed prop is false
    // Should start as open
    expect(getByTestId("closed-status").innerHTML).toBe("Open");

    // Click to close
    fireEvent.click(getByTestId("close-btn"));
    // Displays closed if closed prop is true
    expect(getByTestId("closed-status").innerHTML).toBe("Closed");

    // Confirm that it goes back to open
    fireEvent.click(getByTestId("close-btn"));
    expect(getByTestId("closed-status").innerHTML).toBe("Open");
  });

  test("displays 'Locked' if the locked prop is true and 'Unlocked' if otherwise", () => {
    const { getByTestId } = render(
      <Dashboard>
        <Display />
        <Controls />
      </Dashboard>
    );
    // Ensure Initial render is correct
    expect(getByTestId("lock-status").innerHTML).toBe("Unlocked");

    // Click Open Button
    fireEvent.click(getByTestId("close-btn"));
    // Ensure LOCK status is still Unlocked
    expect(getByTestId("lock-status").innerHTML).toBe("Unlocked");

    // Click Lock Button
    fireEvent.click(getByTestId("lock-btn"));
    // Ensure LOCK status is Locked
    expect(getByTestId("lock-status").innerHTML).toBe("Locked");

    // Click Lock Button Again to check it changes back
    fireEvent.click(getByTestId("lock-btn"));
    // Ensure LOCK status is goes back to Unlocked
    expect(getByTestId("lock-status").innerHTML).toBe("Unlocked");
  });

  test("when locked or closed use the red-led class", () => {
    const { getByTestId } = render(
      <Dashboard>
        <Display />
        <Controls />
      </Dashboard>
    );

    const lockStatus = getByTestId("lock-status");
    const closedStatus = getByTestId("closed-status");

    const lockBtn = getByTestId("lock-btn");
    const closedBtn = getByTestId("close-btn");

    // Click both buttons below to get both States to locked and Closed
    fireEvent.click(closedBtn);
    fireEvent.click(lockBtn);

    // Assert that at these states, the class will be "red-led"
    expect(lockStatus.classList[1]).toBe("red-led");
    expect(closedStatus.classList[1]).toBe("red-led");
  });

  test("when unlocked or open use the green-led class", () => {
    const { getByTestId } = render(
      <Dashboard>
        <Display />
        <Controls />
      </Dashboard>
    );

    const lockStatus = getByTestId("lock-status");
    const closedStatus = getByTestId("closed-status");

    // Default has states at unlocked and open
    // Assert if class of each status is "green-led"
    expect(lockStatus.classList[1]).toBe("green-led");
    expect(closedStatus.classList[1]).toBe("green-led");
  });
});

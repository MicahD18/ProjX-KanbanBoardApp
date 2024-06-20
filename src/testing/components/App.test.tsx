import { render, screen } from "@testing-library/react";
import App from "../../App";
import { describe, expect, it } from "vitest";

describe("App component", () => {
  it("should render Header, Sidebar, and Outlet components correctly when Layout is render", () => {
    render(<App />);

    expect(screen.getByRole("header"));
    expect(screen.getByRole("sidebar"));
    expect(screen.getByRole("main"));
  });
});

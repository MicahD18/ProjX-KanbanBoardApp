import { render, screen } from "@testing-library/react";
import App from "../../App";

describe("App", () => {
  it("should render Header, Sidebar, and Outlet components correctly when Layout is rendered", () => {
    render(<App />);

    expect(screen.getByRole("header"));
    expect(screen.getByRole("nav"));
    expect(screen.getByRole("main"));
  });
});

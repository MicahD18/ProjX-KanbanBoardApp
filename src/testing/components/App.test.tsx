import { render, screen } from "@testing-library/react";
import App from "../../App";

describe("App", () => {
  it("renders the Header component", () => {
    render(<App />);
    const headerElement = screen.getByRole("header");
    expect(headerElement).toBeTruthy();
  });

  it("renders the Sidebar component", () => {
    render(<App />);
    const sidebarElement = screen.getByRole("navigation");
    expect(sidebarElement).toBeTruthy();
  });

  it("renders the BoardsPage component", () => {
    render(<App />);
    const boardsPageElement = screen.getByRole("boards");
    expect(boardsPageElement).toBeTruthy();
  });
});

import { describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CopyButton } from "@/components/CopyButton";
import { Tabs } from "@/components/Tabs";
import { ThemeToggle } from "@/components/ThemeToggle";

vi.mock("next/navigation", () => ({ usePathname: () => "/docs/bridge/tools/" }));
const { DocsSidebar } = await import("@/components/docs/DocsSidebar");

describe("CopyButton", () => {
  it("copies its text and confirms", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    render(<CopyButton text="npx expo install expo-mcp-bridge" />);
    await user.click(screen.getByRole("button", { name: "Copy to clipboard" }));
    expect(writeText).toHaveBeenCalledWith("npx expo install expo-mcp-bridge");
    expect(await screen.findByRole("button", { name: "Copied" })).toHaveTextContent("Copied");
  });
});

describe("ThemeToggle", () => {
  it("switches Midnight ⇄ Ivory and remembers the choice", async () => {
    const user = userEvent.setup();
    document.documentElement.dataset.theme = "dark";
    render(<ThemeToggle />);
    await user.click(await screen.findByRole("button", { name: "Theme: Midnight. Switch to Ivory" }));
    expect(document.documentElement.dataset.theme).toBe("ivory");
    expect(localStorage.getItem("theme")).toBe("ivory");
    await user.click(screen.getByRole("button", { name: "Theme: Ivory. Switch to Midnight" }));
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});

describe("Tabs", () => {
  const tabs = [
    { label: "npm", content: <p>npm install</p> },
    { label: "Expo", content: <p>npx expo install</p> },
  ];

  it("shows one panel at a time and switches on click", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText("npm install")).toBeVisible();
    expect(screen.getByText("npx expo install")).not.toBeVisible();
    await user.click(screen.getByRole("tab", { name: "Expo" }));
    expect(screen.getByRole("tab", { name: "Expo" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("npx expo install")).toBeVisible();
  });

  it("supports arrow keys", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} />);
    act(() => screen.getByRole("tab", { name: "npm" }).focus());
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Expo" })).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "npm" })).toHaveAttribute("aria-selected", "true");
  });
});

describe("DocsSidebar", () => {
  it("marks the current page", () => {
    render(<DocsSidebar />);
    const current = screen.getAllByRole("link", { current: "page" });
    expect(current.length).toBeGreaterThan(0);
    current.forEach((a) => expect(a).toHaveTextContent("Tools reference"));
    expect(screen.getByRole("button", { expanded: false })).toHaveTextContent("Tools reference");
  });
});

describe("AgentDemo", () => {
  it("plays the scripted session through to the agent's verdict", async () => {
    vi.useFakeTimers();
    const { AgentDemo } = await import("@/components/home/AgentDemo");
    render(<AgentDemo />);
    expect(screen.queryByText("Please enter your password.")).toBeNull();
    // The demo loops, so step until the verdict appears rather than jumping past it.
    for (let i = 0; i < 40 && !screen.queryByText(/Login blocks an empty password/); i++) {
      await act(() => vi.advanceTimersByTimeAsync(300));
    }
    expect(screen.getByText(/Login blocks an empty password/)).toBeInTheDocument();
    expect(screen.getByText("Please enter your password.")).toBeInTheDocument();
    expect(screen.getByText("sam@demo.dev")).toBeInTheDocument();
    vi.useRealTimers();
  });
});

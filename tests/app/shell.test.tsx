import React from "react";
import { render, screen } from "@testing-library/react";

import HomePage from "@/app/page";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

describe("application shell", () => {
  it("renders the main navigation links", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: "词条" })).toHaveAttribute("href", "/terms");
    expect(screen.getByRole("link", { name: "教程" })).toHaveAttribute("href", "/tutorials");
    expect(screen.getByRole("link", { name: "分类" })).toHaveAttribute("href", "/terms");
    expect(screen.getByRole("link", { name: "关于" })).toHaveAttribute("href", "/about");
  });

  it("renders the homepage beginner entry points", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: "一个帮你查清 AI 技术词条的资料库。",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /浏览全部词条/ })).toHaveAttribute("href", "/terms");
    expect(screen.getByRole("link", { name: /看精选教程/ })).toHaveAttribute("href", "/tutorials");
    expect(screen.getByRole("heading", { name: "先从这些核心词条开始" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "按技术分类浏览" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "和词条配套的教程" })).toBeInTheDocument();
  });

  it("renders the footer promise", () => {
    render(<SiteFooter />);

    expect(screen.getByText(/AI 技术词条库/)).toBeInTheDocument();
    expect(screen.getByText(/用清楚、结构化的方式/)).toBeInTheDocument();
  });
});

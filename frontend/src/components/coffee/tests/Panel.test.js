import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Panel from "./../js/Panel.js";

describe("Panel component elements", () => {
    beforeEach(() => {
        render(<Panel/>);
    });

    test("should render without crashing",  () => {});

    test("should render header", () => {
        const headerElement = screen.getByText("Admin Panel");
        expect(headerElement).toBeInTheDocument();
    });

    test("should render update div", () => {
        const updateElement = document.getElementById("statusMessageCoffee");
        expect(updateElement).toBeInTheDocument();
    });

    test("should render yes button", () => {
        const buttonElement = screen.getByText("Yes");
        expect(buttonElement).toBeInTheDocument();
    });

    test("should render enroute button", () => {
        const buttonElement = screen.getByText("En Route");
        expect(buttonElement).toBeInTheDocument();
    });

    test("should render no button", () => {
        const buttonElement = screen.getByText("No");
        expect(buttonElement).toBeInTheDocument();
    });

    test("should render logout button", () => {
        const buttonElement = screen.getByText("logout");
        expect(buttonElement).toBeInTheDocument();
    });
});

import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./../js/Footer.js";

describe("Footer", () => {
    it("renders correctly", () => {
        const { getByText } = render(
            <Router>
                <Footer />
            </Router>
        );

        let linkElement = getByText("Home");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", "/");

        linkElement = getByText("Admin");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", "/admin")

        const spacerElement = getByText("|");
        expect(spacerElement).toBeInTheDocument();
    });
});

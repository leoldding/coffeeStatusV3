import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./../js/Footer.js";

describe("Footer", () => {
    it("renders correctly", () => {
        const { getByText } = render(
            <Router>
                <Footer link={"/testRoute"} text={"testText"}/>
            </Router>
        );

        const linkElement = getByText("testText");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", "/testRoute")
    });
});

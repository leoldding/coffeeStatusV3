import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Admin from "./../js/Admin.js";

describe("Admin component elements", () => {
    beforeEach(() => {
        render(<Admin/>);
    });

    test("should render without crashing", () => {});
});

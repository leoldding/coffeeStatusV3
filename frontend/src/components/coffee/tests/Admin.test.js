import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Admin from "./../js/Admin.js";

describe("Admin component elements", () => {
   test("should render without crashing", () => {
       render(<Admin/>);
   });
});
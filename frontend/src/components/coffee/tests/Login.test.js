import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Login from "./../js/Login.js";

describe("Login component elements", () => {
    beforeEach(() => {
        render(<Login/>);
    });

    test("should render without crashing", () => {}) ;

    test("should render header", () => {
        const headerElement = screen.getByText("Admin Login");
        expect(headerElement).toBeInTheDocument();
    });

    test("should render text inputs", () => {
        const inputElements = document.getElementsByClassName("textInput");
        expect(inputElements.length).toEqual(2);
    });

    test("should render login button", () => {
        const buttonElement = screen.getByText("Login");
        expect(buttonElement).toBeInTheDocument();
    });
});

describe("Login component form actions", () => {
    let loginButton
    let usernameInput
    let passwordInput

    beforeEach(() => {
        render(<Login/>);

        loginButton = screen.getByText("Login");
        usernameInput = screen.getByPlaceholderText("Username");
        passwordInput = screen.getByPlaceholderText("Password");
    });

    test("should show empty error message for both inputs", () => {
        fireEvent.click(loginButton);

        const errorMessage = screen.getAllByText("Required")
        expect(errorMessage.length).toEqual(2);
    });

    test("should show empty password error message", () => {
        fireEvent.change(
            usernameInput,
            {target: {value: "test"}}
        );
        fireEvent.click(loginButton);

        const errorMessage = screen.getAllByText("Required")
        expect(errorMessage.length).toEqual(1);
    });

    test("should show empty username error message", () => {
        fireEvent.change(
            passwordInput,
            {target: {value: "test"}}
        );
        fireEvent.click(loginButton);

        const errorMessage = screen.getAllByText("Required")
        expect(errorMessage.length).toEqual(1);
    });
});
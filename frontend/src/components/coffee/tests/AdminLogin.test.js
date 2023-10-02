import "@testing-library/jest-dom";
import React, { useState } from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import AdminLogin from "../js/AdminLogin.js";
import * as api from "./../js/api";

jest.mock("./../js/api");

describe("Admin Login", () => {
    it("renders correctly", () => {
        const { getByText, getByTestId, getAllByRole } = render(
            <AdminLogin />
        )

        const headerElement = getByText("Admin Login");
        expect(headerElement).toBeInTheDocument();

        const formElement = getByTestId("loginForm");
        expect(formElement).toBeInTheDocument();

        const inputElements = getAllByRole("textbox");
        expect(inputElements.length).toEqual(2);

        const buttonElement = screen.getByText("Login");
        expect(buttonElement).toBeInTheDocument();
    });
});

describe("Admin Login Form", () => {
    let loginButton
    let usernameInput
    let passwordInput

    beforeEach(() => {
        jest.clearAllMocks();

        const { getByText, getByPlaceholderText } = render(
            <AdminLogin setLoggedIn={jest.fn()}/>
        )

        loginButton = getByText("Login");
        usernameInput = getByPlaceholderText("Username");
        passwordInput = getByPlaceholderText("Password");
    });

    it("inputs must not be empty", () => {
        fireEvent.click(loginButton);

        let errorMessage = screen.getAllByText("Required")
        expect(errorMessage.length).toEqual(2);

        fireEvent.change(
            usernameInput,
            {target: {value: "test"}}
        );
        fireEvent.click(loginButton);

        errorMessage = screen.getAllByText("Required")
        expect(errorMessage.length).toEqual(1);

        fireEvent.change(
            usernameInput,
            {target: {value: ""}}
        )
        fireEvent.change(
            passwordInput,
            {target: {value: "test"}}
        );
        fireEvent.click(loginButton);

        errorMessage = screen.getAllByText("Required")
        expect(errorMessage.length).toEqual(1);
    });

    it("error for invalid user", async () => {
        fireEvent.change(
            usernameInput,
            {target: {value: "fakeUser"}}
        );
        fireEvent.change(
            passwordInput,
            {target: {value: "password"}}
        );

        api.login.mockRejectedValue({
            response: {
                status: 400
            }
        });

        fireEvent.click(loginButton);

        await waitFor(() => expect(screen.getByText("Invalid User")).toBeInTheDocument());
    });

    it("error for incorrect password", async () => {
        fireEvent.change(
            usernameInput,
            {target: {value: "user"}}
        );
        fireEvent.change(
            passwordInput,
            {target: {value: "wrongPassword"}}
        );

        api.login.mockRejectedValue({
            response: {
                status: 401
            }
        });

        fireEvent.click(loginButton);

        await waitFor(() => expect(screen.getByText("Incorrect Password")).toBeInTheDocument());
    });

    it("loggedIn state change on successful login", async () => {
        fireEvent.change(
            usernameInput,
            {target: {value: "user"}}
        );
        fireEvent.change(
            passwordInput,
            {target: {value: "password"}}
        );

        api.login.mockResolvedValue();

        fireEvent.click(loginButton);

        await waitFor(() => expect(usernameInput).toHaveTextContent(""));
        await waitFor(() => expect(passwordInput).toHaveTextContent(""));
    });
});

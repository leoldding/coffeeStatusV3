import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import AdminPanel from "../js/AdminPanel.js";
import * as api from "./../js/api";

jest.mock("./../js/api");

describe("Admin Panel", () => {
    it("renders correctly", () => {
        const { getByText } = render(
            <AdminPanel />
        )

        const headerElement = getByText("Admin Panel");
        expect(headerElement).toBeInTheDocument();

        const updateElement = document.getElementById("statusMessageCoffee");
        expect(updateElement).toHaveTextContent("");

        let buttonElement = getByText("Yes");
        expect(buttonElement).toBeInTheDocument();

        buttonElement = getByText("En Route");
        expect(buttonElement).toBeInTheDocument();

        buttonElement = getByText("No");
        expect(buttonElement).toBeInTheDocument();

        buttonElement = getByText("logout");
        expect(buttonElement).toBeInTheDocument();
    });
});

describe("Admin Panel Buttons", () => {
    beforeEach(() => {
       jest.clearAllMocks();
    });

    describe("display error notice", () => {
        let buttons = ["Yes", "En Route", "No"]

        for (let i = 0; i < 3; i++) {
            it("error for " + buttons[i] + " button", async () => {
                const { getByText } = render(
                    <AdminPanel />
                );

                const buttonElement = getByText(buttons[i]);

                api.statusUpdate.mockRejectedValue({
                    response: {
                        status: 500
                    }
                });

                fireEvent.click(buttonElement);

                await waitFor(() => expect(getByText("Error with Status Update")).toBeInTheDocument());
            });
        }
    });

    describe("display success notice", () => {
        let buttons = ["Yes", "En Route", "No"]

        for (let i = 0; i < 3; i++) {
            it("success for " + buttons[i] + " button", async () => {
                const { getByText } = render(
                    <AdminPanel />
                );

                const buttonElement = getByText(buttons[i]);

                api.statusUpdate.mockResolvedValue();

                fireEvent.click(buttonElement);

                await waitFor(() => expect(getByText("Status Updated")).toBeInTheDocument());
            });
        }
    });

    it("logs out", async () => {
        const mockFunc = jest.fn()
        const { getByText } = render(
            <AdminPanel setLoggedIn={mockFunc}/>
        )
        const buttonElement = getByText("logout");
        api.logout.mockResolvedValue();
        fireEvent.click(buttonElement);
        await waitFor(() => expect(mockFunc).toHaveBeenCalled());
    });

    it("logs out on unauthorized update", async () => {
        const mockFunc = jest.fn()
        const { getByText } = render(
            <AdminPanel setLoggedIn={mockFunc}/>
        )
        const buttonElement = getByText("Yes");
        api.statusUpdate.mockRejectedValue({
            response: {
                status: 401
            }
        });
        fireEvent.click(buttonElement);
        await waitFor(() => expect(mockFunc).toHaveBeenCalled());
    })
});

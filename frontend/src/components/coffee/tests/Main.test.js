import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Main from "./../js/Main.js";
import * as api from "./../js/api";

jest.mock("./../js/api");


describe("Main", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("renders correctly", async () => {
       api.retrieveStatus.mockResolvedValue("")

       const { getByText, getByTestId } = render(
           <Main />
       );

       const imageElement = getByTestId("coffeeImage");
       await waitFor(() => expect(imageElement.closest("div")).toHaveClass("bg-coffeeRed-1"))
       expect(imageElement).toHaveAttribute("src", "coffee_cup.png");

       const headerElement = getByText("Is Leo at Think Coffee?");
       expect(headerElement).toBeInTheDocument();
    });

    it("info card responds to button", async () => {
        api.retrieveStatus.mockResolvedValue("")

        const { getByRole, getByTestId } = render(
            <Main />
        );

        const imageElement = getByTestId("coffeeImage");
        await waitFor(() => expect(imageElement.closest("div")).toHaveClass("bg-coffeeRed-1"));

        const buttonElement = getByRole("button");
        const cardElement = getByTestId("infoCard");
        expect(cardElement).toHaveClass("opacity-0");
        fireEvent.click(buttonElement);
        expect(cardElement).toHaveClass("opacity-100");
        fireEvent.click(buttonElement);
        expect(cardElement).toHaveClass("opacity-0");
    });
});

describe("Main Container Background",() => {
    beforeEach(() => {
       jest.clearAllMocks();
    });

    it("renders red on api error",async () => {
        api.retrieveStatus.mockRejectedValue("Mocking Retrieve Status API Error");

        const { getByTestId } = render(
            <Main />
        );

        const imageElement = getByTestId("coffeeImage");
        await waitFor(() => expect(imageElement.closest("div")).toHaveClass("bg-coffeeRed-1"));
    });

    it("renders red on 'no' status", async () => {
        api.retrieveStatus.mockResolvedValue("no")

        const { getByTestId } = render(
            <Main />
        );

        const imageElement = getByTestId("coffeeImage");
        await waitFor(() => expect(imageElement.closest("div")).toHaveClass("bg-coffeeRed-1"));
    });

    it("renders yellow on 'enroute' status", async () => {
        api.retrieveStatus.mockResolvedValue("enroute")

        const { getByTestId } = render(
            <Main />
        );

        const imageElement = getByTestId("coffeeImage");
        await waitFor(() => expect(imageElement.closest("div")).toHaveClass("bg-coffeeYellow-1"));
    });

    it("renders red on 'yes' status", async () => {
        api.retrieveStatus.mockResolvedValue("yes")

        const { getByTestId } = render(
            <Main />
        );

        const imageElement = getByTestId("coffeeImage");
        await waitFor(() => expect(imageElement.closest("div")).toHaveClass("bg-coffeeGreen-1"));
    });
});

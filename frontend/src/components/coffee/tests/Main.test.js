import "@testing-library/jest-dom";
import React from "react";
import axios from "axios";
import {render, fireEvent, screen, waitFor} from "@testing-library/react";
import Main from "./../js/Main.js";

jest.mock("axios")

describe("Main component elements", () => {
    beforeEach(() => {
        render(<Main/>)
    });

    test("should render without crashing", async () => {});

    test("should render header", () => {
        const headerElement = screen.getByText("Is Leo at Think Coffee?");
        expect(headerElement).toBeInTheDocument();
    });

    test("should render status", async () => {
        const statusElement = document.getElementsByClassName("iconContainerCoffee")[0];
        expect(statusElement).toBeInTheDocument();
    });

    test("should render info card", async () => {
        const cardElement = document.getElementById("infoContainerCoffee");
        expect(cardElement).toBeInTheDocument();
    });
});

describe("Main component info card", () => {
    beforeEach(() => {
        render(<Main/>);
    });

    test("should start hidden", () => {
       const cardElement = document.getElementById("infoCardCoffee");
       expect(cardElement).toHaveClass("hideCoffee");
    });

    test("should become visible when button clicked", () => {
       const buttonElement = document.getElementById("infoButtonCoffee");
       fireEvent.click(buttonElement);

       const cardElement = document.getElementById("infoCardCoffee");
       expect(cardElement).not.toHaveClass("hideCoffee");
    });

    test("should become hidden if visible when button clicked", () => {
        const buttonElement = document.getElementById("infoButtonCoffee");
        fireEvent.click(buttonElement);
        fireEvent.click(buttonElement);

        const cardElement = document.getElementById("infoCardCoffee");
        expect(cardElement).toHaveClass("hideCoffee");
    });
});

describe("Main component axios", () => {
    test("should retrieve status", async () => {
        axios.get.mockImplementation(() => Promise.resolve({data: "yes"}))

        axios.get("/backend/coffeeRetrieveStatus")
            .then((response) => {
                expect(response.data).toEqual("yes");
            })
    });
});
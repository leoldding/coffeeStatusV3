import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Main from "./../js/Main.js";
import coffee_cup from "./../../../assets/coffee_cup.png"


describe("Main component elements", () => {
    beforeEach(() => {
       render(<Main/>)
    });

    test("should render without crashing", () => {});

    test("should render header", () => {
        const headerElement = screen.getByText("Is Leo at Think Coffee?");
        expect(headerElement).toBeInTheDocument();
    });

    test("should render status", () => {
        const statusElement = document.getElementsByClassName("iconContainerCoffee")[0];
        expect(statusElement).toBeInTheDocument();
    });

    test("should render info card", () => {
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
    })
});

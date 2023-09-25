import "@testing-library/jest-dom";
import React from "react";
import {render, waitFor} from "@testing-library/react";
import Admin from "./../js/Admin.js";
import * as api from "./../js/api";

jest.mock("./../js/api");

describe("Admin", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("renders login when session doesn't exist", async () => {
        api.checkSession.mockRejectedValue("Mocking No Active Admin Session");

        const { getByText } = render(
            <Admin />
        )

        await waitFor(() => expect(getByText("Admin Login")).toBeInTheDocument());
    });

    it("renders panel when session does exist", async () => {
        api.checkSession.mockResolvedValue("Mocking Active Admin Session");

        const { getByText } = render(
           <Admin />
        )

        await waitFor(() => expect(getByText("Admin Panel")).toBeInTheDocument());
    });
});

import Axios from "axios";

export const retrieveStatus = () => {
    return Axios.get("/backend/coffeeRetrieveStatus")
        .then((res) => {
            if (res.status === 200) {
                return res.data.status;
            } else {
                throw new Error("Unable to retrieve status.");
            }
        }
    );
}

export const checkSession = () => {
    return Axios.get("/backend/coffeeCheckSession")
        .then((res) => {
            if (res.status === 200) {
                return res;
            } else {
                throw new Error("No active admin session.");
            }
        }
    );
}

export const logout = () => {
    return Axios.get("/backend/coffeeLogout")
        .then((res) => {
            if (res.status === 500) {
                throw new Error("Server error while removing session.")
            }
        })
}

export const statusUpdate = (status) => {
    return Axios.post("/backend/coffeeStatusUpdate", {
        status: status,
    })
        .then((res) => {
            if (res.status === 200) {
                return null
            } else if (res.status === 401) {
                throw new Error("Invalid session.")
            } else {
                throw new Error("Error with status update.")
            }
        })
}

export const login = (username, password) => {
    return Axios.post("/backend/coffeeLogin", {
        username: username,
        password: password
    })
        .then((res) => {
            if (res.status === 200) {
                return null
            } else if (res.status === 400) {
                throw new Error("Invalid User")
            } else {
                throw new Error("Incorrect Password")
            }
        })
}

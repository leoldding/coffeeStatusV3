import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CoffeeMain from "./Main"
import CoffeeAdmin from "./Admin"

function App() {
    // set index elements
    useEffect(() => {
        let icon = document.getElementById("icon")
        icon.href = process.env.PUBLIC_URL + "coffee_cup.png"

        let apple_icon = document.getElementById("apple_icon")
        apple_icon.href = process.env.PUBLIC_URL + "coffee_cup.png"

        document.body.className = "bg-coffeeWhite-1 text-coffeeBlack-1";
    }, []);

    return (
        <div className={"h-screen"}>
            <Routes>
                <Route path={""} element={<CoffeeMain />} />
                <Route path={"admin"} element={<CoffeeAdmin />} />
                <Route path={"*"} element={<Navigate to="" replace />} />
            </Routes>
        </div>
    )
}


export default App;

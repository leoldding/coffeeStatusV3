import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import CoffeeMain from './components/coffee/js/Main.js'
import CoffeeAdmin from './components/coffee/js/Admin.js'
import coffee_cup from "./assets/coffee_cup.png";
import "./styles.css";

function App() {
    // set index elements
    useEffect(() => {
        let icon = document.getElementById("icon")
        icon.href = coffee_cup

        let apple_icon = document.getElementById("apple_icon")
        apple_icon.href = coffee_cup

        document.body.className = "bg-coffeeWhite-1 text-coffeeBlack-1";
    }, []);

    return (
        <div className={"h-screen"}>
          <Router>
            <Routes>
              <Route path={"/"} element={<CoffeeMain />}></Route>
              <Route path={"/admin"} element={<CoffeeAdmin />}></Route>
              <Route
                  path="*"
                  element={<Navigate to="/" replace />}
              />
            </Routes>
          </Router>
        </div>
    )
}


export default App;

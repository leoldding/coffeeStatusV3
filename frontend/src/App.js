import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import CoffeeRoutes from "./components/coffee/js/CoffeeRoutes";

import "./styles.css";

function App() {
    return (
        <div>
           <Router>
                <Routes>
                    <Route path={"/*"} element={<CoffeeRoutes />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;

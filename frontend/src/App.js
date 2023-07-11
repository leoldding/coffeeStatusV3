import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import CoffeeMain from './components/coffee/js/Main.js'
import CoffeeAdmin from './components/coffee/js/Admin.js'

class App extends React.Component {

  render() {
    return (
        <>
          <Router>
            <Routes>
              <Route path={"/coffee"} element={<CoffeeMain />}></Route>
              <Route path={"/coffee/admin"} element={<CoffeeAdmin />}></Route>
              <Route
                  path="*"
                  element={<Navigate to="/" replace />}
              />
            </Routes>
          </Router>
        </>
    )
  }
}


export default App;

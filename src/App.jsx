import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Layout from "./Layout";


function App() {
    return(
      <Router>
      <Routes>

        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>} />
          // Add the routes here for each card

        </Route>

      </Routes>
      </Router>
    );
}

export default App
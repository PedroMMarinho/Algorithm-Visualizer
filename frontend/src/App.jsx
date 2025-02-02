import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Layout from "./Layout";
import Algorithm from "./Pages/Algorithm";
import NotFound from "./Pages/NotFound";

const algorithmCategories = [
  "graph",
  "sorting",
  "searching",
  "backtracking",
  "divide-conquer",
  "greedy",
  "dynamic-programming",
];

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          
          <Route path="/:category" element={<Algorithm categories={algorithmCategories} />} />

         
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

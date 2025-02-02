import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Layout from "./Layout";
import Algorithm from "./Pages/Algorithm";

const algorithmCategories = [
  'graph',
  'sorting',
  'searching',
  'backtracking',
  'divide-conquer',
  'greedy',
  'dynamic-programming'
];

function App() {
    return(
      <Router>
      <Routes>

        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>} />
          <Route 
            path="/:category" 
            element={<Algorithm />} 
            loader={({ params }) => {
              if (!algorithmCategories.includes(params.category)) {
                throw new Response("Not Found", { status: 404 });
              }
              return null;
            }}
          />

        </Route>

      </Routes>
      </Router>
    );
}

export default App
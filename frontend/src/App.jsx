import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Layout from "./Layout";
import Algorithm from "./Pages/Algorithm";
import NotFound from "./Pages/NotFound";

// Define the categories of algorithms
const algorithmCategories = [
  "graph",
  "sorting",
  "searching",
  "backtracking",
  "divide-conquer",
  "greedy",
  "dynamic-programming",
];

// Change the data to match the categories and algorithms I want to display
const algorithmsData = {
  "graph": ["Dijkstra", "Bellman-Ford", "Floyd-Warshall"],
  sorting: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Insertion Sort', 'Selection Sort', 'Heap Sort', 'Radix Sort', 'Counting Sort', 'Bucket Sort', 'Shell Sort', 'Cocktail Sort', 'Comb Sort', 'Pigeonhole Sort', 'Cycle Sort', 'Bitonic Sort', 'Pancake Sort', 'Binary Insertion Sort', 'Bogo Sort', 'Gnome Sort', 'Odd-Even Sort', 'Stooge Sort', 'Strand Sort', 'Bozo Sort', 'Slow Sort', 'Sleep Sort', 'Bead Sort', 'Pancake'],
  searching: ["Linear Search", "Binary Search"],
  backtracking: ["N-Queens", "Sudoku Solver"],
  "divide-conquer": ["Merge Sort", "Quick Sort"],
  greedy: ["Fractional Knapsack", "Prim's Algorithm"],
  "dynamic-programming": ["0-1 Knapsack", "Longest Common Subsequence"],
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          
          <Route path="/:category" element={<Algorithm categories={algorithmCategories} />} />

          <Route path="/:category/:algorithm" element={<Algorithm categories={algorithmCategories} algorithmsData={algorithmsData}/>} />
         
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

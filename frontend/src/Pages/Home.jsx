import Content from "../Content/Content";
import WelcomeText from "../WelcomeText/WelcomeText";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

function Home() {
  const cardData = [
    {
      title: "Graph Problems",
      image: "../src/assets/graph.jpg",
      description:
        "Explore graph algorithms like Dijkstra’s for shortest paths and Kruskal’s for minimum spanning trees.",
      route: "/graph",
    },
    {
      title: "Sorting Algorithms",
      image: "../src/assets/sorting.jpg",
      description:
        "Learn to efficiently order data with algorithms like Quick Sort and Merge Sort for optimal performance.",
      route: "/sorting",
    },
    {
      title: "Searching Algorithms",
      image: "../src/assets/search.jpg",
      description:
        "Master search techniques like Binary Search and Breadth-First Search (BFS) for fast element lookup.",
      route: "/searching",
    },
    {
      title: "Backtracking Algorithms",
      image: "../src/assets/backtracking.png",
      description:
        "Solve problems like the N-Queens or Sudoku by exploring all possible solutions and backtracking when necessary.",
      route: "/backtracking",
    },
    {
      title: "Divide and Conquer Algorithms",
      image: "../src/assets/divide_conquer.jpg",
      description:
        "Solve complex problems by breaking them into smaller tasks, such as with Quick Sort and Merge Sort.",
      route: "/divide-conquer",
    },
    {
      title: "Greedy Algorithms",
      image: "../src/assets/greedy.jpg",
      description:
        "Optimize solutions with algorithms like Dijkstra’s and Kruskal’s, focusing on local choices for global results.",
      route: "/greedy",
    },
    {
      title: "Dynamic Programming Algorithms",
      image: "../src/assets/dynamic.jpg",
      description:
        "Break problems into subproblems and reuse solutions, like in the Knapsack Problem and Fibonacci Sequence.",
      route: "/dynamic-programming",
    },
  ];
  return (
    <>
      <Header />
      <Content>
        <WelcomeText></WelcomeText>
        {cardData.map((data, index) => (
          <Link key={index} to={data.route}>
            <Card
              title={data.title}
              image={data.image}
              description={data.description}
            />
          </Link>
        ))}
      </Content>
    </>
  );
}

export default Home;

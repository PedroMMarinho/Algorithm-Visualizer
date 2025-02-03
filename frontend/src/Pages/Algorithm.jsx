import AlgorithmRunner from "../AlgorithmRunner/AlgorithmRunner";
import NotFound from "./NotFound";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";

function Algorithm({ categories, algorithmsData }) {
  const { category, algorithm } = useParams();

  if (!categories.includes(category)) {
    return <NotFound />;
  }

  if (algorithm) {
    
    const algorithmName = algorithm
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    
    if (!algorithmsData[category].includes(algorithmName)) {
      return <NotFound />;
    }
  }

  const style = {
    height: "89vh",
  };
  return (
    <>
      <Header />
      <div style={style}>
        <AlgorithmRunner algorithmCategory={category} />
      </div>
    </>
  );
}

export default Algorithm;

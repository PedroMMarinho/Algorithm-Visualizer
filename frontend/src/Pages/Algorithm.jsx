import AlgorithmRunner from '../AlgorithmRunner/AlgorithmRunner';
import NotFound from "./NotFound"; 
import { useParams } from "react-router-dom";
import Header from '../Header/Header';


function Algorithm ({ categories }) {
    const { category } = useParams();

    if (!categories.includes(category)) {
      return <NotFound />;
    }

    const style = {
        height: "89vh",
      };
      return (
        <>
        <Header />
          <div style={style}>
            <AlgorithmRunner/>
          </div>
        </>
      );
};

export default Algorithm;
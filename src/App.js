import { useEffect, useState } from "react";
import { Plot } from "./components/Plot";
import * as d3 from "d3";
import "./index.css";

export default function App() {

  useEffect(() => {

    const fetchData = async () => {
      const csvURL = 'https://gist.githubusercontent.com/low-sky/bec36274c4bf28619e503e2ae6a59d3a/raw/5dbc063e0a954a88df283a046f996c586ad20fb6/EgyptCities.csv';


      d3.csv(csvURL).then(makePlotData);
    };
    
    fetchData();
  }, []);

  const [plotData, setPlotData] = useState({datasets: []});

  return (
    <div className="App">
      <Plot plotData={plotData} />
    </div>
  );
}

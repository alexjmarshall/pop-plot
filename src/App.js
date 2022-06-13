import { useEffect, useState } from "react";
import { Plot } from "./components/Plot";
import * as d3 from "d3";
import "./index.css";

export default function App() {

  useEffect(() => {

    const fetchData = async () => {
      const csvURL = 'https://gist.githubusercontent.com/low-sky/bec36274c4bf28619e503e2ae6a59d3a/raw/5dbc063e0a954a88df283a046f996c586ad20fb6/EgyptCities.csv';
      const makePlotData = datapoints => {
        // datapoint example:
        // {
        //  Name: "Cairo"
        //  lat: "30.0444"
        //  lng: "31.2358"
        //  population: "19787000"
        // }

        // TODO make AREA proportional to pop. not radius of the circle

        const data = datapoints.map(p => ({
          x: p.lat,
          y: p.lng,
          r: p.population,
        }));

        setPlotData({
          datasets: [{
            label: 'Egyptian Cities',
            data,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }]
        });
      };

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

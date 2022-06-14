import { useEffect, useState } from "react";
import { Plot } from "./components/Plot";
import * as d3 from "d3";
import "./index.css";
import { radiusFromArea } from "./Utils";

export default function App() {
  
  const [plotData, setPlotData] = useState({datasets: []});
  const label = 'Egyptian Cities';
  const bgColors = {
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    highlightColor: 'rgba(255, 99, 132, 0.9)',
  };


  useEffect(() => {

    const fetchData = async () => {

      const url = 'https://gist.githubusercontent.com/low-sky/bec36274c4bf28619e503e2ae6a59d3a/raw/5dbc063e0a954a88df283a046f996c586ad20fb6/EgyptCities.csv';

      const makePlotData = datapoints => {
        // datapoint example:
        // {
        //  Name: "Cairo"
        //  lat: "30.0444"
        //  lng: "31.2358"
        //  population: "19787000"
        // }

        const radiusInPixelsFromPop = (pop) => radiusFromArea(pop) / 50;

        const data = datapoints
          .filter(p => Number(p.lng) && Number(p.lat) && Number(p.population))
          .map(p => ({
            x: p.lng,
            y: p.lat,
            r: radiusInPixelsFromPop(p.population),
            Name: p.Name,
            selected: false,
          }));

        setPlotData({
          datasets: [{
            label,
            data,
            backgroundColor: data.map(d => bgColors.backgroundColor),
          }]
        });
      };

      await d3.csv(url).then(makePlotData);
    };
    
    fetchData();
  }, []);

  return (
    <div className="App">
      <Plot
        data={plotData}
        bgColors={bgColors}
      />
    </div>
  );
}

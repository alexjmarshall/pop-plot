import { Chart as ChartJS } from 'chart.js/auto';
import { Bubble } from "react-chartjs-2";

export const Plot = ({ plotData }) => {

  const options = {};

  return (
    <div>
      <Bubble
        data={plotData}
        options={options}
      />
    </div>
  );
};

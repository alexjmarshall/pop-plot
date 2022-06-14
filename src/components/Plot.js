import { Chart as ChartJS } from 'chart.js/auto';
import { Bubble } from "react-chartjs-2";

export const Plot = ({ data, titles }) => {

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: titles.y,
        },
      },
      x: {
        title: {
          display: true,
          text: titles.x,
        },
      },
    },
  };

  return (
    <div>
      <Bubble data={data} options={options} />
    </div>
  );
};

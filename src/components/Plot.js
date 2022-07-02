import { useState } from "react";
import { Chart as ChartJS, registerables} from 'chart.js';
import { Bubble } from "react-chartjs-2";
import { getDistanceFromLatLonInKm, roundTo2DecimalPlaces, includesArray } from "../Utils";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
ChartJS.register(...registerables);
ChartJS.register(annotationPlugin);


export const Plot = ({ data, bgColors }) => {
  
  const [selected, setSelected] = useState([]);

  const syncSelected = (selected, chart) => {

    const datasets = chart.data.datasets;
    for (const [i, {data}] of datasets.entries()) {
      for (const [j] of data.entries()) {
        const select = includesArray(selected, [i,j]);
        datasets[i].data[j].selected = select;
        datasets[i].backgroundColor[j] = select ? bgColors.highlightColor : bgColors.backgroundColor;
      }
    }

    setSelected(selected);
    chart.update();
  }


  const drawLineBetweenCities = (selected, chart) => {
    
    const datasets = chart.data.datasets;
    const cityOne = datasets[selected[0][0]].data[selected[0][1]];
    const cityTwo = datasets[selected[1][0]].data[selected[1][1]];
    const distanceInKm = getDistanceFromLatLonInKm(cityOne.y, cityOne.x, cityTwo.y, cityTwo.x);
    const content = `${roundTo2DecimalPlaces(distanceInKm)}km`;

    chart.options.plugins.annotation.annotations.distance = {
      type: 'line',
      yMin: cityOne.y,
      yMax: cityTwo.y,
      xMin: cityOne.x,
      xMax: cityTwo.x,
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      label: {
        content,
        enabled: true,
      }
    };

    chart.update();
  };


  const plotClick = (evt, elm) => {

    const chart = evt.chart;
    const datasets = chart.data.datasets;

    // if clicking the plot between cities, clear selected cities
    if (!elm.length) {
      return syncSelected([], chart);
    }

    const { index, datasetIndex } = elm[0];
    const isSelected = datasets[datasetIndex].data[index].selected;
    const item = [datasetIndex, index];

    // if clicking a selected city, remove from selected array
    if (isSelected) {
      const selectedArr = selected.filter(c => !c.every((value, index) => value === item[index]));
      return syncSelected(selectedArr, chart);
    }


    // if this is the first city selected, add to selected array and return
    if (!selected.length) {
      selected.push(item);
      return syncSelected(selected, chart);
    }


    // if another city has been selected,
    //  remove any cities after the first one from selected array
    //  add this city
    //  draw line between cities
    while (selected.length > 1) selected.pop();
    selected.push(item);
    syncSelected(selected, chart);

    drawLineBetweenCities(selected, chart);
  };


  const unit = 'Degrees';
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: context => context.raw.Name
        },
      },
      datalabels: {
        color: '#000000',
        formatter: value => value.Name,
        display: context => {
          const index = context.dataIndex;
          const value = context.dataset.data[index];
          return value.selected;
        }
      },
      annotation: {
        annotations: {
        }
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: `Latitude (${unit})`,
        },
      },
      x: {
        title: {
          display: true,
          text: `Longitude (${unit})`,
        },
      },
    },
    onClick: (evt, elm) => plotClick(evt, elm) 
  };


  return (
    <div>
      <Bubble
        data={data}
        options={options}
        plugins={[ChartDataLabels, annotationPlugin]}
      />
    </div>
  );
};

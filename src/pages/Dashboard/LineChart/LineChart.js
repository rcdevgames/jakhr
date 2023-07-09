import React from "react";
import numeral from 'numeral';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
export default class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        data: props.data,
        options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  callback: function (value) {
                    return numeral(value).format('0.0'); // memformat nilai angka dengan pemisah ribuan
                  }
                }
              }]
            }
          }
    };
  }

  render() {
    return (
      <div id="chart">
       <Line options={this.state.options} data={this.state.data} height={200} />
      </div>
    );
  }
}

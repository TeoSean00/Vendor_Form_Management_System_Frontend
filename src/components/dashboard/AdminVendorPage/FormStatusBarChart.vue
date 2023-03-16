<template>
  <Bar
    id="form-status-bar-chart"
    :options="FormStatusBarChartOptions"
    :data="FormStatusBarChart"
  />
</template>

<script>
import { computed, ref } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale, PointElement,
  LineElement,
  plugins
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  plugins
)

export default {
  components: {
      Bar,
  },
  setup() {
    // ------------------------------------------------------------Bar Chart for Forms Statuses------------------------------------------------------------
    // metadata for file status bar chart
    const FormStatusBarChart = ref({
        // labels for each file status in the bar chart
        labels: ['Awaiting Vendor', 'Awaiting Admin', 'Awaiting Approver', 'Completed', "Rejected" ],
        // data values corresponding to each file status bar in the bar chart
        datasets: [{
            label: 'Breakdown of Vendor SGXChange\'s form statuses',
            data: [40, 20, 12, 10, 6],
            backgroundColor: [
              'rgb(153, 51, 255 )',
              'rgb(54, 162, 235)',
              'rgb(255, 128, 0)',
              'rgb(100, 202, 150)',
              'rgb(255, 75, 132)',
            ]
        }],
    })
    // configuration options for bar chart
    const FormStatusBarChartOptions = ref({
        chartOptions: {
            responsive: false,
            maintainAspectRatio: true,
        }
    })

    return {
      FormStatusBarChart,
      FormStatusBarChartOptions
    }
  }
}
</script>

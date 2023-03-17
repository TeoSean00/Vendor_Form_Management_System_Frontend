<template>
  <!-- 2nd chart -->
  <Line
    id="vendor-count-line-chart"
    :options="VendorLineChartOptions"
    :data="VendorLineChart"
  />
</template>

<script>
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  plugins
} from 'chart.js'

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
    Line,
  },
  setup () {
    // metadata for vendor line chart
    const VendorLineChart = ref({
      // labels for each month in the line chart
      labels: ["Jan", "Mar", "May", "July", "Sep", "Nov"],
      // data values corresponding to each month in the line chart
      datasets: [
        {
          label: "Number of vendors over time",
          data: [5, 10, 12, 18, 20, 25],
          backgroundColor: ["rgb(153, 51, 255 )"],
        },
      ],
    });
    // configuration options for bar chart
    const VendorLineChartOptions = ref({
      chartOptions: {
        responsive: false,
        maintainAspectRatio: true,
      },
    });

    return {
      VendorLineChart,
      VendorLineChartOptions,
    }
  }
}
</script>

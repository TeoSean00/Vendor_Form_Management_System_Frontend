<template>
  <!-- 2nd chart -->
  <div style="height: 100%; width: 100%;">
    <Line
    id="vendor-count-line-chart"
    :options="VendorLineChartOptions"
    :data="VendorLineChart"
    />
  </div>
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
      labels: ["January", "March", "May", "August", "November"],
      // data values corresponding to each month in the line chart
      datasets: [
        {
          label: "Number of Vendors Over Time",
          data: [5, 10, 12, 18, 20],
          backgroundColor: ["rgb(153, 51, 255)"],
        },
      ],
    });
    // configuration options for bar chart
    const VendorLineChartOptions = ref({
      responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0
        },
        scales: {
          x: {
            ticks: {
              font: {
                size: 12.5
              }
            }
          },
          y: {
            ticks: {
              font: {
                size: 12.5
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: "Number of Vendors Over Time",
            align: "center",
            font: {
              size: 16
            },
            padding: {
              bottom: 18,
            }
          },
          legend: {
            display: false,
          }
        }
    });

    return {
      VendorLineChart,
      VendorLineChartOptions,
    }
  }
}
</script>

<template>
  <!-- 2nd chart -->
  <PolarArea
    id="days-spent-per-stakeholder-per-form"
    :options="PolarAreaChartOptions"
    :data="PolarAreaChart"
  />
</template>

<script>
import { ref, computed } from 'vue'
import { PolarArea } from 'vue-chartjs'
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
    PolarArea,
  },
  setup () {
    // metadata for Avg days spent per stakeholder polar area chart
    const PolarAreaChart = ref({
      // labels for each stakeholder in the polar area chart
      labels: ["Vendor", "Admin", "Approver"],
      // data values corresponding to each stakeholder
      datasets: [
        {
          label: "Avg days spent on each stakeholder per form",
          data: [5, 10, 8],
          backgroundColor: [
            "rgb(153, 51, 255 )",
            "rgb(54, 162, 235)",
            "rgb(255, 128, 0)",
          ],
        },
      ],
    });
    // configuration options for bar chart
    const PolarAreaChartOptions = ref({
      chartOptions: {
        responsive: false,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: "HELLO",
          },
        },
      },
    });

    return {
      PolarAreaChart,
      PolarAreaChartOptions,
    };
  }
}
</script>

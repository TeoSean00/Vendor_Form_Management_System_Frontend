<template>
  <!-- 2nd chart -->
  <div style="height: 100%; width: 100%;">
    <PolarArea
      id="days-spent-per-stakeholder-per-form"
      :options="PolarAreaChartOptions"
      :data="PolarAreaChart"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { PolarArea, Doughnut } from 'vue-chartjs'
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
    PolarArea, Doughnut
  },
  setup () {
    // metadata for Avg days spent per stakeholder polar area chart
    const PolarAreaChart = ref({
      // labels for each stakeholder in the polar area chart
      labels: ["Vendor", "Admin", "Approver"],
      // data values corresponding to each stakeholder
      datasets: [
        {
          label: "Avg Number of Revisions Occured at each Stakeholder",
          data: [7, 9, 11],
          backgroundColor: [
            '#bc5090',
            'rgb(54, 162, 235)',
            '#ffa600',
          ],
        },
      ],
    });
    // configuration options for bar chart
    const PolarAreaChartOptions = ref({
      responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0
        },
        plugins: {
          title: {
            display: true,
            text: "Avg Number of Revisions Per Stakeholder",
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
      PolarAreaChart,
      PolarAreaChartOptions,
    };
  }
}
</script>

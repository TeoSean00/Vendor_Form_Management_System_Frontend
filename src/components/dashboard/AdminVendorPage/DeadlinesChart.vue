<template>
  <div style="height: 100%; width: 100%;">
    <Bar
      id="days-spent-per-stakeholder-per-form"
      :options="FormDeadlineBarChartOptions"
      :data="FormDeadlineBarChart"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { Bar } from 'vue-chartjs'
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
    Bar
  },
  setup () {
    // ------------------------------------------------------------Bar Chart for Forms Deadlines------------------------------------------------------------
    // computed property to order FormDeadlineBarChart x-axis by y-axis values, leftmost least days left to deadline and rightmost most days left to deadline
    const FormDeadlineBarChartSort = computed(() => {
      const labels = ['Form A', 'Form B', 'Form C', 'Form D']
      const values = [8, 2, 12, 6]
      const dict = {}
      for (let i = 0; i < labels.length; i++) {
        dict[labels[i]] = values[i]
      }

      let sortable = []
      for (var labelsort in dict) {
        sortable.push([labelsort, dict[labelsort]])
      }
      sortable.sort(function (a, b) {
        return a[1] - b[1]
      })

      const sorteddict = {}
      for (let index in sortable) {
        sorteddict[sortable[index][0]] = sortable[index][1]
      }

      const finalLabel = []
      const finalValues = []
      for (let i = 0; i < sortable.length; i++) {
        finalLabel.push(sortable[i][0])
        finalValues.push(sortable[i][1])
      }
      // console.log(sorteddict, finalLabel, finalValues)
      return [finalLabel, finalValues]
    })

    // metadata for file status bar chart
    const FormDeadlineBarChart = ref({
      // labels for each file status in the bar chart
      labels: FormDeadlineBarChartSort.value[0],
      // data values corresponding to each file status bar in the bar chart
      datasets: [
        {
          label: "Vendor Sean's Forms Days Left to Deadline",
          data: FormDeadlineBarChartSort.value[1],
          backgroundColor: [
            '#bc5090',
            'rgb(54, 162, 235)',
            '#ffa600',
            'rgb(100, 202, 150)'
          ]
        }
      ]
    })

    // configuration options for bar chart
    const FormDeadlineBarChartOptions = ref({
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
            text: "Vendor Sean's Forms Days Left to Deadline",
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
    })

    return {
      FormDeadlineBarChart,
      FormDeadlineBarChartOptions,
      FormDeadlineBarChartSort
    }
  }
}
</script>

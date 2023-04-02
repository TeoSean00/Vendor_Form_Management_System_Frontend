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
import { ref, computed } from 'vue';
import { Line } from 'vue-chartjs';
import VendorService from "../../../services/vendor/vendorService";
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
    var year = new Date().getFullYear();

    // method to process the overall vendor month created data, to tag them to their specific displayed months on dashboard
    const filteredVendorData = computed(() => {
      let newValues = [0, 0, 0, 0, 0];
      if (vendorData.value) {
        let data = vendorData.value[year]["months"];
        for (const month in data) {
          if (month == "January" || month == "February") {
            newValues[0] = data[month];
          }
          else if (month == "March" || month == "April") {
            newValues[1] = data[month];
          }
          else if (month == "May" || month == "June" || month == "July") {
            newValues[2] = data[month];
          }
          else if (month == "August" || month == "September" || month == "October") {
            newValues[3] = data[month];
          }
          else if (month == "November" || month == "December") {
            newValues[4] = data[month];
          }
        }
      }
      return newValues;
    })

    // metadata for vendor line chart
    const VendorLineChart = computed(() => {
      return {
        // labels for each month in the line chart
        labels: ["January", "March", "May", "August", "November"],
        // data values corresponding to each month in the line chart
        datasets: [
          {
            label: "Number of Vendors Over Time",
            data: filteredVendorData.value,
            backgroundColor: ["rgb(153, 51, 255)"],
          },
        ],
      }
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
            text: "Number of Newly Onboarded Vendors in " + year,
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

    // async await method call to retrieve the raw overall vendor creation dates data from Backend
    var vendorData = ref(null);
    var getVendorInfo = async () => {
      vendorData.value = await VendorService.getJoinDates().then((response) => {
        return response;
      })
    }

    getVendorInfo();

    return {
      VendorLineChart,
      VendorLineChartOptions,
      filteredVendorData
    }
  }
}
</script>

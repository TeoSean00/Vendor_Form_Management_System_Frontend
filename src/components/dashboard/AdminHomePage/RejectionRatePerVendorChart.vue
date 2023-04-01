<template>
  <!-- 1st chart -->
    <div style="height: 100%; width: 100%;">
      <Bar
      id="file-status-bar-chart"
      :options="FileStatusBarChartOptions"
      :data="barChartData"
      />  
    </div>
</template>
  
  <script>
  import { ref, computed } from "vue";
  import { Bar } from "vue-chartjs";
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
    plugins,
  } from "chart.js";
  
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
  );
  
  export default {
    components: {
      Bar,
    },
    setup() {
      // Metadata for Form Status Bar Chart, computed() is used as data fetched is dynamic as it is calling the Backend for data
      const barChartData = computed(() => {
        return {
          // labels for each file status in the bar chart
          labels: FormRejectionBarChartSort.value[0],
          // data values corresponding to each file status bar in the bar chart
          datasets: [
            {
              label: "Avg Number of Form Rejections Per Vendor",
              data: FormRejectionBarChartSort.value[1],
              backgroundColor: [
                '#bc5090',
                'rgb(54, 162, 235)',
                '#ffa600',
                'rgb(100, 202, 150)'
              ],
            },
          ],
        };
      });
  
      // configuration options for bar chart
      const FileStatusBarChartOptions = ref({
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
              text: "Avg Number of Form Rejections Per Vendor",
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
    
      // async await method call to retrieve the raw overall form status data from Backend
      var vendorData = ref(null);
  
      var getVendorInfo = async () => {
        // console.log("getForms() Backend API call is invoked! Before Value: ", vendorData.value);
        vendorData.value = await VendorService.getVendorRejectionRate().then((response) => {
          return response;
        });
        console.log("After retrieval value: ", vendorData.value);
      };

      getVendorInfo();

      // sorting the rejection rate data in a desecnding order, showing top 4 vendors with highest rates only
      const FormRejectionBarChartSort = computed(() => {
        var labels = []
        var values = []
        if (vendorData.value != null) {
          for (const vendor in vendorData.value) {
            labels.push(vendor)
            values.push(vendorData.value[vendor])
          }
        }
        else {
          labels = ["defaultVendor", "defaultVendor", "defaultVendor", "defaultVendor"]
          values = [0, 0, 0, 0]
        }
        const dict = {}
        for (let i = 0; i < labels.length; i++) {
          dict[labels[i]] = values[i]
        }

        let sortable = []
        for (var labelsort in dict) {
          sortable.push([labelsort, dict[labelsort]])
        }
        sortable.sort(function (a, b) {
          return b[1] - a[1]
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
        if (finalLabel.length > 4 && finalValues.length > 4) {
          return [finalLabel.slice(0, 4), finalValues.slice(0, 4)];
        }
        else {
          return [finalLabel, finalValues];
        }
    });
  
      return {
        barChartData,
        FileStatusBarChartOptions,
      }
    }
  }
  </script>
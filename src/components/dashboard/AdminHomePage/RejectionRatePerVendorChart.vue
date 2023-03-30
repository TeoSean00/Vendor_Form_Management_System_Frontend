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
  import FormService from "../../../services/form/formService";
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
      // Method to process overall form status data, to break them down into their respective staus and increment its count accordingly
      const filteredvendorData = computed(() => {
        // console.log("Overall form status data pulled, processing into respective status now, current data: ", vendorData.value);
        let newValues = [0, 0, 0, 0];
        if (vendorData.value) {
          for (let i = 0; i < vendorData.value.length; i++) {
            let status = vendorData.value[i].status;
            if (status === "vendor_response") {
              newValues[0] += 1;
            } else if (status === "admin_response") {
              newValues[1] += 1;
            } else if (status === "approver_response") {
              newValues[2] += 1;
            } else if (status === "form_completed") {
              newValues[3] += 1;
            }
          }
        }
        return newValues;
      });
  
      // Metadata for Form Status Bar Chart, computed() is used as data fetched is dynamic as it is calling the Backend for data
      const barChartData = computed(() => {
        return {
          // labels for each file status in the bar chart
          labels: [
            "Vendor A",
            "Vendor B",
            "Vendor C",
            "Vendor D",
          ],
          // data values corresponding to each file status bar in the bar chart
          datasets: [
            {
              label: "Avg Number of Form Rejections Per Vendor",
              data: [4,3,2,1],
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
        // vendorData.value = await VendorService.getVendorRejectionRate().then((response) => {
        //   return response;
        // });
        console.log("After retrieval value: ", vendorData.value);
      };
  
      getVendorInfo();
  
      return {
        barChartData,
        vendorData,
        FileStatusBarChartOptions,
      }
    }
  }
  </script>
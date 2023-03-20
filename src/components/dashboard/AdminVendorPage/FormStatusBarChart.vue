<template>
  <Bar
    id="form-status-bar-chart"
    :options="formStatusBarChartOptions"
    :data="formStatusBarChartData"
  />
</template>

<script>
import { computed, ref } from 'vue';
import { Bar } from 'vue-chartjs';
import FormService from '../../../services/form/formService';
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
  props: {
    vendorID: ""
  },
  setup(props) {
    console.log("vendorID passed from parent page => ", props);

    // Method to process overall form status data, to break them down into their respective staus and increment its count accordingly
    const filteredFormData = computed(() => {
      console.log("Overall form status data pulled, processing into respective status now, current data: ", formData.value);
      let newValues = [0, 0, 0, 0];
      if (formData.value) {
        for (let i = 0; i < formData.value.length; i++) {
          let status = formData.value[i].status;
          if (status === "vendor_response") {
            newValues[0] += 1;
          } else if (status === "admin_review") {
            newValues[1] += 1;
          } else if (status === "approver_review") {
            newValues[2] += 1;
          } else if (status === "completed") {
            newValues[3] += 1;
          }
        }
      }
      return newValues;
    });
    
    // Metadata for Form Status Bar Chart, computed() is used as data fetched is dynamic as it is calling the Backend for data
    const formStatusBarChartData = computed(() => {
      return {
        // labels for each file status in the bar chart
        labels: [
          "Awaiting Vendor",
          "Awaiting Admin",
          "Awaiting Approver",
          "Completed",
        ],
        // data values corresponding to each file status bar in the bar chart
        datasets: [
          {
            label: "Breakdown of Vendor Sean's Form Statuses",
            data: filteredFormData.value,
            backgroundColor: [
              "#bc5090",
              "rgb(54, 162, 235)",
              "rgb(255, 128, 0)",
              "rgb(100, 202, 150)",
            ],
          },
        ],
      };
    });

    // configuration options for bar chart
    const formStatusBarChartOptions = ref({
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
            text: "Breakdown of Vendor Sean's Form Statuses",
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

    var formData = ref(null);

    var getVendorFormsInfo = async () => {
      console.log("prior to getVendorForms() invoked> ", formData.value);
      formData.value = await FormService.getVendorForms(props.vendorID).then((response) => {
        return response;
      })
      console.log("After getVendorForms() invoked> ", formData.value);
    }

    getVendorFormsInfo();

    return {
      props,
      formStatusBarChartData,
      formStatusBarChartOptions,
    }
  }
}
</script>

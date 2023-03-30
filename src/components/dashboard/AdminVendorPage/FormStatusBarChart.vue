<template>
  <div style="height: 100%; width: 100%;">
    <Bar
    id="form-status-bar-chart"
    :options="formStatusBarChartOptions"
    :data="formStatusBarChartData"
    />
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
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
    vendorDetails: ""
  },
  setup(props) {
    // Method to process overall form status data, to break them down into their respective staus and increment its count accordingly
    const filteredFormData = computed(() => {
      // console.log("Overall form status data pulled, processing into respective status now, current data: ", formData.value);
      let newValues = [0, 0, 0, 0];
      if (formData.value) {
        for (let i = 0; i < formData.value.length; i++) {
          let status = formData.value[i].status;
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
            label: formData.value != null ? `Breakdown of Vendor ${props.vendorDetails.name}'s Form Statuses` : "",
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
    var formStatusBarChartOptions = computed(() => {
      return {
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
            text: formData.value != null ? `Breakdown of Vendor ${props.vendorDetails.name}'s Form Statuses` : "",
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
      }
    });

    // Method to dynamically fetch all forms under current Vendor, by using watchEffect() and vendorDetails props passed from parent page
    var formData = ref(null);

    watchEffect(async () => {
      // console.log("vendor details data passed> ", props.vendorDetails);
      if (props.vendorDetails != null) {
        try {
          formData.value = await FormService.getVendorForms(props.vendorDetails.id).then((response) => {
            return response;
          })
        }
        catch (error) {
          // console.log("error occured while getting forms for vendor", error);
        }
      }
      // console.log("After getVendorForms() invoked> ", formData.value);    
    })

    return {
      props,
      formStatusBarChartData,
      formStatusBarChartOptions,
    }
  }
}
</script>

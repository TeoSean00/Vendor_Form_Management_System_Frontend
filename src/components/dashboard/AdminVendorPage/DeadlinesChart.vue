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
import { computed, ref, watchEffect } from 'vue'
import FormService from '../../../services/form/formService';
import { Bar } from 'vue-chartjs';
import moment from 'moment';
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
  props: {
    vendorDetails: "",
  },
  setup(props) {
    // computed property to order FormDeadlineBarChart x-axis by y-axis values, leftmost least days left to deadline and rightmost most days left to deadline
    const FormDeadlineBarChartSort = computed(() => {
      const labels = daysToDeadline.value[0]
      const values = daysToDeadline.value[1]
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
      if (finalLabel.length > 4 && finalValues.length > 4) {
        return [finalLabel.slice(0, 4), finalValues.slice(0, 4)];
      }
      else {
        return [finalLabel, finalValues];
      }
    });

    // Method to calculate days left to deadline based on current date and form's stated deadline
    const daysToDeadline = computed(() => {
      var formLabels = [];
      var formDaysLeft = [];
      var date = new Date();
      var dateNow = date.getDate();
      var monthNow = (parseInt(date.getMonth()) + 1).toString();
      if (monthNow.length == 1) {
        monthNow = "0" + monthNow;
      }
      var yearNow = date.getFullYear();
      var currentDate = monthNow + "/" + dateNow + "/" + yearNow;
      if (formData.value) {
        for (let i = 0; i < formData.value.length; i++) {
          let formDates = formData.value[i].deadline.split("-");
          let formYear = formDates[0];
          let formMonth = formDates[1];
          let formDate = formDates[2];
          if (formDate.length == 1) {
            formDate = "0" + formDate;
          }
          let formDeadline = moment(formMonth + "/" + formDate + "/" + formYear, "MM/DD/YYYY");
          let currentDateNow = moment(currentDate, "MM/DD/YYYY");
          var daysLeft = formDeadline.diff(currentDateNow, 'days');
          let currentFormName = formData.value[i].content.FormInfo.formName;
          // console.log("deadline:", formDeadline, "datenow:", currentDateNow, "daysleft: ", daysLeft, "currentForm:", currentFormName);
          formLabels.push(currentFormName);
          formDaysLeft.push(daysLeft);
        }
      }
      return [formLabels, formDaysLeft];
    })

    // Metadata for Form Status Bar Chart, computed() is used as data fetched is dynamic as it is calling the Backend for data
    const FormDeadlineBarChart = computed(() => {
      return {
        // labels for each file status in the bar chart
        labels: FormDeadlineBarChartSort.value[0],
        // data values corresponding to each file status bar in the bar chart
        datasets: [
          {
            label: formData.value != null ? `Vendor ${props.vendorDetails.name}'s Forms Days Left to Deadlines` : "",
            data: FormDeadlineBarChartSort.value[1],
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
    var FormDeadlineBarChartOptions = computed(() => {
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
            text: formData.value != null ? `Vendor ${props.vendorDetails.name}'s Forms Days Left to Deadlines` : "",
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
          console.log("error occured while getting forms for vendor", error);
        }
      }
      // console.log("After getVendorForms() invoked> ", formData.value);    
    })

    return {
      FormDeadlineBarChart,
      FormDeadlineBarChartOptions,
      FormDeadlineBarChartSort
    }
  }
}
</script>

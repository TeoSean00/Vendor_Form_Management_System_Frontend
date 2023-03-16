<template>
  <div class="container">
    <!-- <h2 class="mt-3">Admin's Home Page Dashboards</h2> -->
    <div class="row">
      <!-- 1st chart -->
      <div class="col my-auto">
        <FormStatusBarChart />
      </div>
      <!-- 2nd chart -->
      <div class="col my-auto">
        <VendorLineChart />
      </div>
      <!-- 3rd chart -->
      <div class="col my-auto">
        <DaysBreakdownPolarChart />
      </div>
    </div>
  </div>
</template>

<script>
import FormStatusBarChart from "./FormStatusBarChart.vue";
import VendorLineChart from "./VendorLineChart.vue";
import DaysBreakdownPolarChart from "./DaysBreakdownPolarChart.vue";

export default {
  components: {
    FormStatusBarChart,
    VendorLineChart,
    DaysBreakdownPolarChart
  },
  setup() {
  },
};
</script>

<template>
  <div class="container">
    <h2 class="mt-3 mb-4">Admin's Home Page Dashboards</h2>
    <div class="row">
      <!-- 1st chart -->
      <div class="col">
        <FormStatusBarChart style="height: 14em;" />
      </div>
      <!-- 2nd chart -->
      <div class="col">
        <VendorLineChart style="height: 14em;" />
      </div>
      <!-- 3rd chart -->
      <div class="col my-auto">
        <RejectionRatePerVendorChart style="height: 14em;" />
      </div>
    </div>
  </div>
</template>

<script>
import FormStatusBarChart from "./FormStatusBarChart.vue";
import VendorLineChart from "./VendorLineChart.vue";
import RejectionRatePerVendorChart from "./RejectionRatePerVendorChart.vue.vue";

export default {
  components: {
    FormStatusBarChart,
    VendorLineChart,
    RejectionRatePerVendorChart
  },
  setup() {
  },
};
</script>

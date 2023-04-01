<template>
  <div class="container">
    <h2 class="mt-5 mb-4">Vendor's Home Page Dashboards</h2>
    <div class="row">
      <!-- 1st chart -->
      <div class="col">
        <FormStatusBarChart vendorID="6409bf14f5a8a3592938ed73" />
      </div>
      <!-- 2nd chart -->
      <div class="col">
        <UpdatesTodayChart />
      </div>
      <!-- 3rd chart -->
      <div class="col">
        <DeadlinesChart />
      </div>
    </div>
  </div>
</template>

<script>
import FormStatusBarChart from './FormStatusBarChart.vue'
import UpdatesTodayChart from './UpdatesTodayChart.vue'
import DeadlinesChart from './DeadlinesChart.vue'

export default {
  components: {
    FormStatusBarChart,
    UpdatesTodayChart,
    DeadlinesChart
  },
  setup () {}
}
</script>

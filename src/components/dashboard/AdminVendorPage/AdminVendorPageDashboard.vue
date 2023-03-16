<template>
  <div class="container">
    <h2 class="mt-3">Admin's Vendor Page Dashboards</h2>
    <div class="row">
      <!-- 1st chart -->
      <div class="col my-auto">
        <FormStatusBarChart />
      </div>

      <!-- 2nd chart -->
      <div class="col my-auto">
        <UpdatesTodayChart />
      </div>

      <!-- 3rd chart -->
      <div class="col my-auto">
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

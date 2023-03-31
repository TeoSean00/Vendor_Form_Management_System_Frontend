<template>
  <!-- <div class="py-4 container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        Commented out the statistics stuff
        <div class="row">
          <div class="col-lg-4 col-md-6 mt-4">
            <chart-holder-card
              title="Form Completion"
              subtitle="Progress of forms"
              update="updated 4 min ago"
              color="primary"
            >
              <reports-bar-chart
                :chart="{
                  labels: ['New', 'Pending', 'Completed'],
                  datasets: {
                    label: 'Sales',
                    data: [1, 2, 3],
                  },
                }"
              />
            </chart-holder-card>
          </div>
          <div class="col-lg-4 col-md-6 mt-4">
            <chart-holder-card
              title="Number of Users"
              subtitle="(<span class='font-weight-bolder'>+15%</span>) increase in users this month."
              update="updated 4 min ago"
              color="secondary-blue"
            >
              <reports-line-chart
                :chart="{
                  labels: [
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                  datasets: {
                    label: 'Mobile apps',
                    data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
                  },
                }"
              />
            </chart-holder-card>
          </div>
          <div class="row mt-4">
            <div class="col-lg-4 col-md-6 col-sm-6">
              <mini-statistics-card
                :title="{ text: 'Manage Vendors', value: '$53k' }"
                detail="<span class='text-success text-sm font-weight-bolder'>+55%</span> than last week"
                :icon="{
                  name: 'weekend',
                  color: 'text-white',
                  background: 'dark',
                  symbol: 'fa-clipboard',
                  height: 2,
                }"
                @click="toggleWorkflow"
              />
            </div>
            <div class="col-lg-4 col-md-6 col-sm-6">
              <mini-statistics-card
                :title="{ text: 'Manager Users', value: '2,300' }"
                detail="<span class='text-success text-sm font-weight-bolder'>+3%</span> than last month"
                :icon="{
                  name: 'leaderboard',
                  color: 'text-white',
                  background: 'primary',
                  symbol: 'user',
                }"
                @click="toggleUserView"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->

    
  <div class="row">
    <div class="col-4">
      <mini-statistics-card
        :title="{ text: 'Manage Vendors', value: '$53k' }"
        detail="<span class='text-success text-sm font-weight-bolder'>+55%</span> than last week"
        :icon="{
          name: 'weekend',
          color: 'text-white',
          background: 'dark',
          symbol: 'fa-store',
          height: 2,
        }"
        @click="toggleWorkflow"
      />
    </div>
    <div class="col-4">
      <mini-statistics-card
        :title="{ text: 'Manager Users', value: '2,300' }"
        detail="<span class='text-success text-sm font-weight-bolder'>+3%</span> than last month"
        :icon="{
          name: 'leaderboard',
          color: 'text-white',
          background: 'primary',
          symbol: 'user',
        }"
        @click="toggleUserView"
       class="mx-auto"/>
    </div>
    <div class="col-4">
      <mini-statistics-card
        :title="{ text: 'Manage Templates', value: '2,300' }"
        :icon="{
          name: 'leaderboard',
          color: 'text-white',
          background: 'primary',
          symbol: 'clipboard',
        }"
        @click="toggleFormBuilder"
       class="mx-auto"/>
    </div>
  </div>
</template>
<script>
import MiniStatisticsCard from "./components/MiniStatisticsCard.vue";
import ChartHolderCard from "./components/ChartHolderCard.vue";
import ReportsBarChart from "./components/charts/ReportsBarChart.vue";
import ReportsLineChart from "./components/charts/ReportsLineChart.vue";

import { useRouter } from "vue-router";

export default {
  components: {
    MiniStatisticsCard,
    ChartHolderCard,
    ReportsBarChart,
    ReportsLineChart,
  },
  setup() {
    const router = useRouter();

    const toggleWorkflow = () => {
      router.push("/vendors");
    };

    const toggleUserView = () => {
      router.push("/users");
    };

    const toggleFormBuilder = () => {
      router.push("/managetemplates");
    };

    return { toggleWorkflow, toggleUserView, toggleFormBuilder };
  },
};
</script>

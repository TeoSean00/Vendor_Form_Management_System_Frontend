<template>
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
        :title="{ text: 'Manage Users', value: '2,300' }"
        detail="<span class='text-success text-sm font-weight-bolder'>+3%</span> than last month"
        :icon="{
          name: 'leaderboard',
          color: 'text-white',
          background: 'primary',
          symbol: 'user',
        }"
        @click="toggleUserView"
        class="mx-auto"
      />
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
        class="mx-auto"
      />
    </div>
  </div>
</template>
<script>
import MiniStatisticsCard from "./components/MiniStatisticsCard.vue";

import { useRouter } from "vue-router";

export default {
  components: {
    MiniStatisticsCard,
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

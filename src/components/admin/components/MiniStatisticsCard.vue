<template>
  <div id="statisticCard" class="card mb-2">
    <div class="row p-3">
      <div class="col-6 rounded-3 text-center">
        <font-awesome-icon
          :icon="`${icon.symbol}`"
          style="height: 3rem"
          class="p-4 shadow"
        />
      </div>
      <div class="col-6 ">
        <!-- <p class="text-sm mb-0 text-capitalize">{{ title.text }}</p> -->
        <p class="mb-0 fs-5 mt-4">{{ title.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#statisticCard {
  cursor: pointer;
  transition: all 0.5s;
}

#statisticCard:hover {
  color: white;
  background: #54b5bf;
  border: none;
}

#statisticCard:hover p:after {
  opacity: 1;
  right: 0;
}
</style>

<script>
export default {
  name: "MiniStatisticsCard",
  data() {
    return {
      reverseDirection: "flex-row-reverse justify-content-between",
    };
  },
  props: {
    title: {
      type: Object,
      required: true,
      text: String,
      value: [Number, String],
    },
    detail: {
      type: String,
      default: "",
    },
    icon: {
      type: Object,
      required: true,
      name: String,
      color: String,
      background: String,
      default: () => ({
        color: "text-white",
        background: "success",
      }),
    },
    directionReverse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

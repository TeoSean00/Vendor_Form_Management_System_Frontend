<template>
  <div v-if="type == 'text'">
    <input
      type="text"
      placeholder="Key in title"
      v-model="title"
      @input="updateQuestion"
    />
    <span>{{ idx }} Input field here</span>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["type", "idx"],
  emits: ["updateQuestion"],
  setup(props, context) {
    const title = ref();

    function updateQuestion() {
      const componentInfo = {
        type: props.type,
        order: props.idx,
        text: title.value,
      };
      context.emit("updateQuestion", componentInfo);
      // console.log(componentInfo);
    }

    return { props, context, updateQuestion, title };
  },
};
</script>

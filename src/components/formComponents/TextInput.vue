<template>
  <input
    type="text"
    placeholder="Key in title"
    v-model="itemInfo.text"
    @input="updateText"
  />
  <span>{{ idx }} Input field here</span>
  <button @click="removeQuestion">Delete question</button>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["itemInfo", "idx"],
  emits: ["updateText", "removeQuestion"],
  setup(props, context) {
    function updateText() {
      context.emit("updateText", props.itemInfo);
    }

    function removeQuestion() {
      //Passes from TextInput > FormComponent
      context.emit("removeQuestion", props.idx);
    }

    return { props, context, updateText, removeQuestion };
  },
};
</script>

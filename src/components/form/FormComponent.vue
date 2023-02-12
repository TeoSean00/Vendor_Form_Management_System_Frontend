<template>
  <div v-if="itemInfo.type == 'text'">
    <TextInput
      :itemInfo="itemInfo"
      :idx="idx"
      @updateText="updateQuestion"
      @removeQuestion="remove"
    />
  </div>
</template>

<script>
import { ref } from "vue";

import TextInput from "./TextInput.vue";

export default {
  props: ["itemInfo", "idx"],
  emits: ["updateQuestion", "remove"],
  components: {
    TextInput,
  },
  setup(props, context) {
    const title = ref();

    function updateQuestion(componentInfo) {
      context.emit("updateQuestion", componentInfo);
    }

    function remove(questionKey) {
      //Passes from FormComponent > ForBuilder
      context.emit("remove", questionKey);
    }

    return { props, context, title, updateQuestion, remove };
  },
};
</script>

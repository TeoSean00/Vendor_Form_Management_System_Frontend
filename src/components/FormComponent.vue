<template>
  <div v-if="type == 'text'">
    <TextInput
      :idx="idx"
      @updateText="updateQuestion"
      @removeQuestion="remove"
    />
  </div>
</template>

<script>
import { ref } from "vue";

import TextInput from "./formComponents/TextInput.vue";

export default {
  props: ["type", "idx"],
  emits: ["updateQuestion", "remove"],
  components: {
    TextInput,
  },
  setup(props, context) {
    const title = ref();

    function updateQuestion(componentInfo) {
      // const componentInfo = {
      //   type: props.type,
      //   order: props.idx,
      //   text: title.value,
      // };
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

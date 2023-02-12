<template>
  <div v-if="itemInfo.type == 'text'">
    <TextInput
      :itemInfo="itemInfo"
      :idx="idx"
      @updateText="updateQuestion"
      @removeQuestion="remove"
    />
  </div>
  <div v-if="itemInfo.type == 'checkbox'">
    <CheckboxInput
    :itemInfo="itemInfo"
    :idx="idx"
    @updateText="updateQuestion"
    @removeQuestion="remove"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import CheckboxInput from "./formComponents/CheckboxInput.vue";
import TextInput from "./formComponents/TextInput.vue";

export default {
  props: ["itemInfo", "idx"],
  emits: ["updateQuestion", "remove"],
  components: {
    TextInput,
    CheckboxInput
},
  setup(props, context) {
    const title = ref();

    function updateQuestion(componentInfo) {
      context.emit("updateQuestion", componentInfo);
      console.log(componentInfo)
    }

    function remove(questionKey) {
      //Passes from FormComponent > ForBuilder
      context.emit("remove", questionKey);
    }

    return { props, context, title, updateQuestion, remove };
  },
};
</script>

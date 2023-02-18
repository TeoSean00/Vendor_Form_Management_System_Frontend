<template>
    Order No: {{ idx }}
    <br>
  <input
    type="text"
    placeholder="Key in title"
    v-model="itemInfo.text"
    @input="updateText"
  />
  
  <span>Date Input Here</span>
  <button @click="removeQuestion">Delete question</button>
</template>

<script>
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

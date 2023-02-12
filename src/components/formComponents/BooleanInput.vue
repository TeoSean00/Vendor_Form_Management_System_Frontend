<template>
    Order No: {{ idx }}
    <br>
    <input
        type="text"
        placeholder="Key in question"
        v-model="itemInfo.text"
        @input="updateText"
    />
    <span>Yes | No </span>
    <button @click="removeQuestion">Delete question</button>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    props: ["itemInfo", "idx"],
    emits: ["updateText", "removeQuestion"],
    setup(props, context) {
      function updateText() {
        context.emit("updateText", props.itemInfo.value);
      }
  
      function removeQuestion() {
        //Passes from TextInput > FormComponent
        context.emit("removeQuestion", props.idx);
      }
   
      return { props, context, updateText, removeQuestion,};
    },
  };
  </script>
  
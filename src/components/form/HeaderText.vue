<template>
    Order No: {{ idx }}
    <br>
    <input
      type="text"
      placeholder="Key in title"
      v-model="itemInfo.text"
      @input="updateText"
    />
    <select v-model="itemInfo.style"> 
        <option value="h1">h1</option>
        <option value="h2">h2</option>
        <option value="h3">h3</option>
    </select>
    <button @click="removeQuestion">Delete header</button>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    props: ["itemInfo", "idx"],
    emits: ["updateText", "removeQuestion"],
    setup(props, context) {
        var style = ref("h1");
      function updateText() {
        context.emit("updateText", props.itemInfo);
      }
  
      function removeQuestion() {
        //Passes from TextInput > FormComponent
        context.emit("removeQuestion", props.idx);
      }
  
      return { props, context, style, updateText, removeQuestion };
    },
  };
  </script>
  
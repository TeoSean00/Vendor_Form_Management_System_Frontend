<template>
    Order No: {{ idx }}
    <br>
    <input
        type="text"
        placeholder="Key in question"
        v-model="itemInfo.text"
        @input="updateText"
    />
    <button @click="addOption"> Option + </button>
    <button @click="removeQuestion">Delete question</button>
    <br>
    <span v-for="i in noOfOptions">
        <input 
            type="text"
            placeholder="Option"
            v-model="itemInfo.options[i-1]"
        />
        <button @click="removeOption(i)"> [X]  </button>
    </span>

  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    props: ["itemInfo", "idx"],
    emits: ["updateText", "removeQuestion"],
    setup(props, context) {
      var noOfOptions = ref(1);

      function updateText() {
        context.emit("updateText", props.itemInfo.value);
      }
  
      function removeQuestion() {
        //Passes from TextInput > FormComponent
        context.emit("removeQuestion", props.idx);
      }

      function addOption(){
          noOfOptions.value += 1;
      }

      function removeOption(i){
          noOfOptions.value -= 1;
          props.itemInfo.options.splice(i-1,1);
      }
  
      return { props, context, noOfOptions, updateText, removeQuestion, addOption, removeOption};
    },
  };
  </script>
  
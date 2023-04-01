<template>
    <!-- Order No: {{ idx }}
    <br> -->
    <div class="row p-3">
      <input
        class="col-8 template-text-input p-3 my-1 ml-5 mr-5"
        type="text"
        placeholder="Header"
        v-model="itemInfo.text"
        @input="updateText"
      />
      <select class="col-1 mx-2 form-select-sm" v-model="itemInfo.style"> 
          <option value="h1">h1</option>
          <option value="h2">h2</option>
          <option value="h3">h3</option>
      </select>
    </div>
  <hr>
    <div class="row">
      <div class="col-12 text-end px-5 py-1">
        <span >
          Required
          <input v-model="itemInfo.required" class="form-check-input bg-dark-grey mx-2" type="checkbox">
          <button class="borderless-button mx-2" @click="removeQuestion">
            <font-awesome-icon icon="fa-solid fa-trash" />
          </button>
        </span>
      </div>
    </div>

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
  
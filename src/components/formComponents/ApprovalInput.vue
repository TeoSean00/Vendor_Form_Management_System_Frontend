<template>
    <input
        type="text"
        class="col-8 template-text-input p-3 my-1 ml-5 mr-5"
        placeholder="Approval Template Here"
        v-model="itemInfo.text"
        @input="updateText"
        disabled
    />
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
  
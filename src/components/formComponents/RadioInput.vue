<template>
  <input
    type="text"
    placeholder="Untitled Radio Question"
    class="col-8 template-text-input p-3 my-1 ml-5 mr-5"
    v-model="itemInfo.text"
    @input="updateText"
  />
  <button class="px-3 borderless-button" @click="addOption" > 
      <font-awesome-icon icon="fa-solid fa-circle-plus" />
  </button>
  <br />
  <span v-for="(i, index) in noOfOptions" :key="index">
    <font-awesome-icon class="px-3" icon="fa-solid fa-square" />
    <input 
        type="text" 
        placeholder="Option" 
        class="col-6 bg-light-grey p-2 my-3 rounded"
        v-model="itemInfo.options[i - 1]" 
    />
    <button class="borderless-button px-3" @click="removeOption(i)">
        <font-awesome-icon icon="fa-solid fa-xmark" />
    </button>
    <div class="col-6"></div>
  </span>
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
    var noOfOptions = ref(Math.max(1, props.itemInfo.options.length));

    function updateText() {
      context.emit("updateText", props.itemInfo.value);
    }

    function removeQuestion() {
      //Passes from TextInput > FormComponent
      context.emit("removeQuestion", props.idx);
    }

    function addOption() {
      noOfOptions.value += 1;
    }

    function removeOption(i) {
      noOfOptions.value -= 1;
      props.itemInfo.options.splice(i - 1, 1);
    }

    return {
      props,
      context,
      noOfOptions,
      updateText,
      removeQuestion,
      addOption,
      removeOption,
    };
  },
};
</script>

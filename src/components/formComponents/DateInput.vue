<template>
  <div class="row p-3">
    <input
      type="text"
      class="col-4 template-text-input p-3 my-1 ml-5 mr-5"
      placeholder="Untitled Question"
      v-model="itemInfo.text"
      @input="updateText"
    /> 
    <span class="col-2 template-text-answer px-3 ">
      Date Here.
    </span>
    
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

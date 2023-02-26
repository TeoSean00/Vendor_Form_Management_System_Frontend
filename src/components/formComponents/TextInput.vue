<template>
    <!-- Order No: {{ idx }} -->
<div class="row p-3">
  <input
    type="text"
    class="col-8 template-text-input p-3 my-1 ml-5 mr-5"
    placeholder="Untitled Question"
    v-model="itemInfo.text"
    @input="updateText"
  />
  <br>
  <div class="row">
    <p class="col-6 template-text-answer p-3 my-1 ml-5 mr-5">User's Answer Here</p>
    <button class="col-1 borderless-button" @click="removeQuestion">
      <font-awesome-icon icon="fa-solid fa-trash" />
    </button>
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

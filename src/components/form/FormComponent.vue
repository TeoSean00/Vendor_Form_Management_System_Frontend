<template>
  <div
    class="m-2 px-2 border rounded border-light border-1 bg-white shadow-sm"
  >
    <div v-if="itemInfo.type == 'header'">
      <HeaderText
        :itemInfo="itemInfo"
        :idx="idx"
        @updateText="updateQuestion"
        @removeQuestion="remove"
      />
    </div>
    <div v-if="itemInfo.type == 'text'">
      <TextInput
        :itemInfo="itemInfo"
        :idx="idx"
        @updateText="updateQuestion"
        @removeQuestion="remove"
      />
    </div>
    <div v-if="itemInfo.type == 'number'">
      <NumericInput
        :itemInfo="itemInfo"
        :idx="idx"
        @updateText="updateQuestion"
        @removeQuestion="remove"
      />
    </div>
    <div v-if="itemInfo.type == 'boolean'">
      <BooleanInput
        :itemInfo="itemInfo"
        :idx="idx"
        @updateText="updateQuestion"
        @removeQuestion="remove"
      />
    </div>
    <div v-if="itemInfo.type == 'date'">
      <DateInput
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
    <div v-if="itemInfo.type == 'radio'">
      <RadioInput
        :itemInfo="itemInfo"
        :idx="idx"
        @updateText="updateQuestion"
        @removeQuestion="remove"
      />
    </div>
    <div v-if="itemInfo.type == 'likertGroup'">
      <LikertGroupInput
        :itemInfo="itemInfo"
        :idx="idx"
        @updateText="updateQuestion"
        @removeQuestion="remove"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import CheckboxInput from "../formComponents/CheckboxInput.vue";
import TextInput from "../formComponents/TextInput.vue";
import RadioInput from "../formComponents/RadioInput.vue";
import HeaderText from "../formComponents/HeaderText.vue";
import BooleanInput from "../formComponents/BooleanInput.vue";
import DateInput from "../formComponents/DateInput.vue";
import NumericInput from "../formComponents/NumericInput.vue";
import LikertGroupInput from "../formComponents/LikertGroupInput.vue";

export default {
  props: ["itemInfo", "idx"],
  emits: ["updateQuestion", "remove"],
  components: {
    TextInput,
    HeaderText,
    CheckboxInput,
    RadioInput,
    BooleanInput,
    DateInput,
    NumericInput,
    LikertGroupInput,
  },
  setup(props, context) {
    const title = ref();

    function updateQuestion(componentInfo) {
      context.emit("updateQuestion", componentInfo);
    }

    function remove(questionKey) {
      //Passes from FormComponent > ForBuilder
      context.emit("remove", questionKey);
    }

    return { props, context, title, updateQuestion, remove };
  },
};
</script>

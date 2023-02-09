<template>
  <Navbar />
  <div class="row mx-5">
    <div class="col-10">
      <div v-for="(item, index) in formItems" :key="index">
        <FormComponent :type="item" :idx="index" @updateQuestion="update" />
      </div>
    </div>

    <div class="col-2">
      <div class="row">
        <button @click="addText" class="btn btn-main-blue">Add Text</button>
        <button @click="addTextInput" class="btn btn-main-blue">
          Add Text Input
        </button>
      </div>
      <div class="row">
        <button @click="test" class="btn btn-turqouise">Export Form</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import UserService from "../services/userService";
import FormComponent from "../components/FormComponent.vue";
import { ref } from "vue";

export default {
  components: {
    Navbar,
    FormComponent,
  },
  setup() {
    var content = ref("");

    UserService.getUserBoard().then(
      (response) => {
        content.value = response.data;
      },
      (error) => {
        content.value =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );

    var formItems = ref([]);
    var formOutput = ref({});

    addText();
    addTextInput();

    function addText() {
      formItems.value.push("Sample Headers");
    }
    function addTextInput() {
      formItems.value.push("text");
    }

    function update(data) {
      console.log(data);
      formOutput.value[data.order] = data;
      //   for (item in formItems.value) {
      //     console.log(data);
      //     console.log(formItems.value);
      //     console.log(formOutput.value);
      //   }
      // this.formOutput.push(data);
      console.log(formOutput.value);
    }

    return { content, formItems, addText, addTextInput, update };
  },
};
</script>

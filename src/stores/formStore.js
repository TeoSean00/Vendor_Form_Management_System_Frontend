import { defineStore } from "pinia";
import FormService from "../services/vendor/vendorService";

export const useFormStore = defineStore("formStore", {
  state: () => ({
    forms: [],
  }),
  getters: {},
  actions: {
    async addForm(formObject) {
      FormService.addForm(formObject)
        .then(() => {
          console.log("updated after adding");
          this.getForms();
        })
        .catch((error) => {
          console.log("error at formStore", error);
        });
    },
    async getForms() {
      console.log("get forms called!", this.forms);
      this.forms = await FormService.getForms();
      console.log("this.forms is", this.forms);
    },
  },
});

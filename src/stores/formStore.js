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
          this.getForms();
        })
        .catch((error) => {
          console.log("error at formStore", error);
        });
    },
    async getForms() {
      this.forms = await FormService.getForms();
    },
  },
});

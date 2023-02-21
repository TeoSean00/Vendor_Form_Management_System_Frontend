import { defineStore } from "pinia";
import VendorService from "../services/vendor/vendorService";

export const useVendorStore = defineStore("vendors", {
  state: () => {
    return { vendors: [] };
  },
  getters: {
    allTemplates() {
      return this.vendors;
    },
  },
  actions: {
    addVendor(vendorObject) {
      VendorService.addTemplate(vendorObject)
        .then((response) => {
          this.templates.push(vendorObject);
          console.log("form output added!");
          console.log("templates now is ", this.vendors);
        })
        .catch((error) => {
          console.log("error at templateStore", error);
        });
    },
  },
});

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
      VendorService.addVendor(vendorObject)
        .then((response) => {
          this.vendors.push(vendorObject);
          console.log("form output added!");
          console.log("vendors now is ", this.vendors);
        })
        .catch((error) => {
          console.log("error at vendorStore", error);
        });
    },
  },
});

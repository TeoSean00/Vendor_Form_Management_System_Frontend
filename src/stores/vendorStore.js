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
        .then(() => {
          console.log("updated after adding");
          this.getVendors();
        })
        .catch((error) => {
          console.log("error at vendorStore", error);
        });
    },
    getVendors() {
      console.log("get vendors called!");
      VendorService.getVendors()
        .then((response) => {
          console.log("store received vendors", response);
          this.vendors = response;
          return response.data;
        })
        .catch((error) => {
          console.log("error at vendorStore", error);
        });
    },
  },
});

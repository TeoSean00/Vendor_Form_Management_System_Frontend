import { defineStore } from "pinia";
import VendorService from "../services/vendor/vendorService";

export const useVendorStore = defineStore("vendorStore", {
  state: () => ({
    vendors: [],
  }),
  getters: {},
  actions: {
    async addVendor(vendorObject) {
      VendorService.addVendor(vendorObject)
        .then(() => {
          console.log("updated after adding");
          this.getVendors();
        })
        .catch((error) => {
          console.log("error at vendorStore", error);
        });
    },
    async getVendors() {
      console.log("get vendors called!", this.vendors);
      this.vendors = await VendorService.getVendors();
      console.log("this.vendors is", this.vendors);
    },
  },
});

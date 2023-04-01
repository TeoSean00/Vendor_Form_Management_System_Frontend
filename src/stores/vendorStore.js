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
          this.getVendors();
        })
        .catch((error) => {
          console.log("error at vendorStore", error);
        });
    },
    async getVendors() {
      this.vendors = await VendorService.getVendors();
    },
  },
});

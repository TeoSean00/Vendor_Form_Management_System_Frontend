<template>
    <a
        href="#"
        class="justify-content-between list-group-item list-group-item-action text-main-blue p-4 d-flex"
        aria-current="true"
        @click="toggleVendorPage(vendorDetails.name, vendorDetails.id)"
    >
        <!-- <span v-if="vendor.name == null">
        <h3>Company {{ vendor.vendorId }}</h3>
        </span> -->
        <span>
            <h3>Name : {{ vendorDetails.name }}</h3>
            <h5>Country : {{ vendorDetails.country }}</h5>
            <span>Description : {{ vendorDetails.details }}</span
            ><br />
            <span>id : {{ vendorDetails.id }}</span>
        </span>
        <div class="float-right">
            <span class="badge bluebg mx-1 mt-2"> {{filteredFormData[0]}} Awaiting Vendor </span>
            <span class="badge bluebg mx-1 mt-2"> {{filteredFormData[1]}} Awaiting Vendor </span>
            <span class="badge bluebg mx-1 mt-2"> {{filteredFormData[2]}} Awaiting Vendor </span>
        </div>
    </a>

</template>



<script>
//SEANS CODE LOL
import { computed, ref, watchEffect } from 'vue';
import FormService from '../../../services/form/formService';
import { useRouter } from "vue-router";

export default {
    props: {
      vendorDetails: ""
    },
    setup(props) {
     
      const filteredFormData = computed(() => {
        
        let newValues = [0, 0, 0, 0];
        if (formData.value) {
          for (let i = 0; i < formData.value.length; i++) {
            let status = formData.value[i].status;
            if (status === "vendor_response") {
              newValues[0] += 1;
            } else if (status === "admin_response") {
              newValues[1] += 1;
            } else if (status === "approver_response") {
              newValues[2] += 1;
            } else if (status === "completed") {
              newValues[3] += 1;
            }
          }
        }
        return newValues;
      });

      console.log(filteredFormData)
  
      var formData = ref(null);
  
      watchEffect(async () => {
        if (props.vendorDetails != null) {
          try {
            formData.value = await FormService.getVendorForms(props.vendorDetails.id).then((response) => {
                return response;
            })
          }
          catch (error) {
            console.log("error occured while getting forms for vendor", error);
          }
        }
      })
      const router = useRouter();

      const toggleVendorPage = (vendorName, vendorId) => {
      router.push({
        name: "AdminVendor",
        params: {
          name: vendorName,
        },
        query: {
          vendorId: vendorId,
        },
      });
    };
  
      return {
        props,
        filteredFormData,
        toggleVendorPage,
      }
    }
  }
  </script>
  
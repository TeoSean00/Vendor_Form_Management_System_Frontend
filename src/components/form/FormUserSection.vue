<template>
  <div>
    <!-- {{ sectionData }} -->
    <template v-for="(formData, index) in sectionData" :key="index">
      <template v-for="(rowData, index) in formData" :key="index">
        <FormSection :sectionData="rowData" />
      </template>
      <!-- <FormSection :formData="formData" /> -->
    </template>
  </div>
</template>

<script>
import FormSection from "../form/FormSection.vue";
export default {
  components: { FormSection },
  props: ["sectionData"],
  setup() {},
};
</script>

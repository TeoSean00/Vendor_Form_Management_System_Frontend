<template>
  <template v-for="(template, index) in list" :key="index">
    <button
      @click="$emit('addTemplate', template)"
      class="my-1 btn btn-main-blue"
    >
      {{ template.templateInfo.templateName }}
    </button>
  </template>
</template>

<script>
export default {
  emits: ["addTemplate"],
  props: ["list"],
  setup(props, context) {
    var addTemplate = (selectedTemplate) => {
      console.log("selected template is", selectedTemplate);
      context.emit(addTemplate, selectedTemplate);
    };
    return { addTemplate };
  },
};
</script>

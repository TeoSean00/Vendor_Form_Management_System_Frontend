<template>
  <input
    type="text"
    placeholder="Key in title"
    v-model="title"
    @input="updateText"
  />
  <span>{{ idx }} Input field here</span>
  <button @click="removeQuestion">Delete question</button>
</template>

<script>
    import { ref } from "vue";

    export default {
    props: ["type", "idx"],
    emits: ["updateText", "removeQuestion"],
    setup(props, context) {
        const title = ref();

        function updateText() {
            const componentInfo = {
                type: "text",
                order: props.idx,
                text: title.value,
            };
            //Passes from TextInput > FormComponent
            context.emit("updateText", componentInfo);
            // console.log("Text Input component emitting: ");
            // console.log({componentInfo});
        }

        function removeQuestion(){
            //Passes from TextInput > FormComponent
            context.emit("removeQuestion", props.idx);
        }

        return { props, context, title,  updateText, removeQuestion };
    },
    };
</script>

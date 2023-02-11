<template>
    <div v-if="type=='text'">
        <input type="text" placeholder="Key in title" v-model="title" @input="updateQuestion"/> 
        <span>{{idx}} Input field here</span>
    </div>

    
</template>

<script>
import { ref } from "vue";

export default {
    props: ["type", "idx"],
    emits: ["updateQuestion"],
    setup(props, context) {
        const title = ref();
        return {props, context, updateQuestion, title};
    },
};

function updateQuestion(){
    // 0 : {type, order, text}
    const componentInfo = {
        "type" : this.props.type,
        "order" : this.props.idx,
        "text" : this.title,
    }
    this.context.emit('updateQuestion', componentInfo);
    // console.log(componentInfo);
}


</script>



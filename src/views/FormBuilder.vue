<template>
    <Navbar/>
    <div class="row mx-5">
        <div class="col-10">
            <div v-for="(item,index) in formItems" ref="formComponents">
                <FormComponent :type="item" :idx='index'/>
            </div>
        </div>
        
        <div class="col-2">
            <div class="row">
                <button @click="addText" class="btn btn-main-blue">Add Text</button>
                <button @click="addTextInput" class="btn btn-main-blue">Add Text Input</button>                
            </div>
            <div class="row">
                <button @click="test" class="btn btn-turqouise" >Export Form</button>                
            </div>
        </div>

    </div>

</template>

<script>
import Navbar from "../components/Navbar.vue";
import UserService from "../services/userService";
import FormComponent from "../components/FormComponent.vue";
import { ref } from "vue";

export default {
    components: {
        Navbar,
        FormComponent,
    },
    setup() {
        var content = ref("");
        UserService.getUserBoard().then(
        (response) => {
            content.value = response.data;
        },
        (error) => {
            content.value =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
        );
       
        const formItems = ref([]);
        const formComponents = ref([null]);
        return { content, formItems, addText, addTextInput, test, formComponents};
    },
};



function addText(){
    this.formItems.push("Sample Headers");
};
function addTextInput(){
    this.formItems.push("text");
};

function test(){
    console.log(this.formComponents);
    console.log(typeof this.formComponents);
    for (const components in this.formComponents){
        console.log(this.formComponents[components]);
    }
    
}
</script>

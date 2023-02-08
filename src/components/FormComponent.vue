<template>
    <div v-if="type=='text'">
        <input type="text" placeholder="Key in title"/> 
        <span>Input field here</span>
    </div>
    
</template>

<script>
    export default {
        props: ["type"],
        setup(props) {
            console.log(props.title);
            return {props, exportMe};
        },
    };
    function exportMe(){
        return "Fuck yuo";
    }
</script>

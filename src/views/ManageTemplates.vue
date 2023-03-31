<template>
    <div class="container-flex">
      <Navbar/>
      <button @click="refresh">Refresh</button>
      <div class="row">
        <div class="col-8 offset-2 fs-2 fw-bold my-2">
          Template Manager
        </div>
        {{ templatesList }}
        <div class="col-8 offset-2 text-center">
          <table class="table table-bordered table-striped">
              <thead>
              <tr>
                <th class="col-1" scope="col">Index</th>
                <th class="col-2" scope="col">Name</th>
                <th class="col-3" scope="col">Description</th>
                <th class="col-1" scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(template,index) in templatesList" :key="index">
                <td>{{index + 1}}</td>
                <td>{{template.details.templateInfo.templateName}}</td>
                <td>{{template.details.templateInfo.templateDesc}}</td>
                <td>
                  <button>View</button>
                  <button @click="deleteTemplate(template.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
        <!-- <div class="row">
          <div v-for="(template,index) in templatesList">
            <div class="p-3 col-8 offset-2 border border-secondary bg-light-grey shadow-sm">

              {{ template.details.templateInfo.templateName }}
              Index is {{index + 1}}
              {{ template.details.templateInfo.templateDesc }}
            </div>

          </div>
        </div> -->
        <!-- {{ templatesList }} -->
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from "../components/navbar/NavbarJP.vue";
  import templateService from "../services/template/templateService";
  import { useRouter } from "vue-router";
  import { ref } from "vue";
  export default {
    components: { Navbar },
    setup() { 
      var templatesList = ref(null);
      var getTemplatesList = async () => {
        templatesList.value = await templateService.getTemplates();
        };
      getTemplatesList();
      
      function deleteTemplate(id) {
        templateService.deleteTemplates(id)
        .then(()=>{
          templatesList.value = templatesList.value.filter(template => template.id !== id)
        });
     

      }
      function refresh(){
        console.log(templatesList);
        getTemplatesList();
      }
  
      return { templatesList, deleteTemplate, refresh};
    },
  };
  </script>
  
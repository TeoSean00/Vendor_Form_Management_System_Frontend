import {defineStore} from 'pinia'
import TemplateService from "../services/template/templateService";


export const useTemplateStore = defineStore("templateStore",{
    state: () =>{
        return {templates: []}
    },
    getters:{
        allTemplates(){
            TemplateService.getTemplates()
                .then((response) => {
                this.vendors = response;
                return response.data;
                })
                .catch((error) => {
                console.log("error at templateStore", error);
                });
            return this.templates
        }
    },
    actions:{
        addTemplate(templateObject){
            TemplateService.addTemplate(templateObject).then((response)=>{
                this.templates.push(templateObject);
            }).catch(error=>{
                console.log("error at templateStore",error);
            })
        },
        getTemplates() {
            TemplateService.getTemplates()
                .then((response) => {
                this.templates = response;
                return response.data;
                })
                .catch((error) => {
                console.log("error at templateStore", error);
                });
        }
    }

})
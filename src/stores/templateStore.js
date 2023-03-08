import {defineStore} from 'pinia'
import TemplateService from "../services/template/templateService";


export const useTemplateStore = defineStore("templateStore",{
    state: () =>{
        return {templates: []}
    },
    getters:{
        allTemplates(){
            console.log("get vendors called!");
            TemplateService.getTemplates()
                .then((response) => {
                console.log("store received templates", response);
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
                console.log("form output added!");
                console.log("templates now is ", this.templates);
            }).catch(error=>{
                console.log("error at templateStore",error);
            })
        },
        getTemplates() {
            console.log("get vendors called!");
            TemplateService.getTemplates()
                .then((response) => {
                console.log("store received templates", response);
                this.templates = response;
                return response.data;
                })
                .catch((error) => {
                console.log("error at templateStore", error);
                });
        }
    }

})
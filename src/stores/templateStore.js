import {defineStore} from 'pinia'
import TemplateService from "../services/template/templateService";


export const useTemplateStore = defineStore("templates",{
    state: () =>{
        return {templates: []}
    },
    getters:{
        allTemplates(){
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
        }
        
    }

})
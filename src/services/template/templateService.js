import axios from "axios";
import authHeader from '../authHeader';

const API_URL = "http://localhost:8080/api/template/";

class TemplateService {
    addTemplate(templateObject) {
        var data = {
            "details":templateObject, 
        }
        const response = axios.post(API_URL,data,{headers: authHeader()})
        .then(response=>{
            return response.data;
        }).catch(error=>{
            console.log("ohno",error);
            return error
        });
        return response
    }
    getTemplates(){
        const response = axios
            .get(API_URL + "all",{headers:authHeader()})
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log("ohno",error);
                return error;
            });
        return response;
    }

    getTemplate(id){
        const response = axios.get(API_URL + id,{headers: authHeader()})
        .then(response=>{
            return response.data;

        }).catch(error=>{
            console.log("ohno",error);
            return error
        });
        return response
    }
    async deleteTemplates(id){
        const response = axios.delete(API_URL + id,{headers: authHeader()})
        .then(response=>{
            return response.data;
        }).catch(error=>{
            console.log("ohno",error);
            return error
        });
        return response

    }
}

export default new TemplateService();
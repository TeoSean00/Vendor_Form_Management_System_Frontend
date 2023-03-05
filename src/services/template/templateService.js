import axios from "axios";
import authHeader from '../authHeader';

console.log(authHeader())

const API_URL = "http://localhost:8080/api/template/";

class TemplateService {
    addTemplate(templateObject) {
        var data = {
            "details":templateObject, 
        }
        const response = axios.post(API_URL,data,{headers: authHeader()})
        .then(response=>{
            console.log("post request successful!");
            return response.data;
        }).catch(error=>{
            console.log("post request unsuccessful",error);
            return error
        });
        return response
    }
    getTemplates(){
        const response = axios
            .get(API_URL + "all",{headers:authHeader()})
            .then((response) => {
                console.log("get request successful!",response);
                return response.data;
            })
            .catch((error) => {
                console.log("get request unsuccessful", error);
                return error;
            });
        return response;
    }
}

export default new TemplateService();
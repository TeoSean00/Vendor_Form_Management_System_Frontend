import axios from "axios";
import authHeader from '../authHeader';

console.log(authHeader())
// to be updated once backend form and its routes set up

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
}

export default new TemplateService();
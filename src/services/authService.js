import axios from "axios";
import authHeader from './authHeader';

console.log(authHeader())

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
    login(user) {
        const response = axios.post(API_URL + 'signin', {
            username: user.username,
            password: user.password
        }).then(response=>{
            if (response.data.accessToken){
                localStorage.setItem('user',JSON.stringify(response.data));
            }

            return response.data;
        });
        return response
    }

    logout(){
        const response = axios.post(API_URL + 'logout',{headers:authHeader()}).then(
            response=>{
                if(response.data){
                    console.log(response.data.message)
                    localStorage.removeItem('user');
                }
                
            }
        )
        return response
    }

    register(user){
        const response = axios.post(API_URL + 'signup',{
            username: user.username,
            email: user.email,
            password: user.password
        });
        return response
    }
}

export default new AuthService();
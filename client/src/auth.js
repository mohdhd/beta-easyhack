import axios from 'axios'
import jwt_decode from "jwt-decode"

axios.defaults.baseURL = (process.env.NODE_ENV == "development")?"http://localhost:8000":""

export default {
    login(username, password, cb){
        axios.post("/api/users/login", {username, password})
        .then(resp => {
            if(resp.data.token){
                localStorage.setItem("token", resp.data.token);
                cb(true, "success");
            }else{
                cb(false, resp.data.info.message);
            }
        }).catch(err => {
            console.log(err);
            cb(false, "An error occured, please try again");
        })
    },

    signup(username, password,email, cb){ 
        axios.post("/api/users/signup", {username, password,email })
        .then(resp => {
            if(!resp.data.error){
                cb(true, resp.data.message);
            }else{
                cb(false, resp.data.message);
            }
        }).catch(err => {
            console.log(err);
            cb(false, "An error occured, please try again");
        })
    },

    authenticated(){
        return !!localStorage.getItem("token");   
    },

    token(){
        return localStorage.getItem("token");
    },
    user(){
        if(!localStorage.getItem("token")){
            return;
        }
        return jwt_decode(localStorage.getItem("token"));
    },
    logout(){
        localStorage.removeItem("token");
    }
}


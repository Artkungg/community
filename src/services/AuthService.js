import axios from "axios"

const auth_key = 'login-user'
let auth = JSON.parse(localStorage.getItem(auth_key))
const user = auth ? auth.user: ''
const token = auth ? auth.token: ''

const api = 'http://127.0.0.1:8000/'
export default{
    async login({email,password}){
        try{
            let url = api + 'api/login'
            let body = {
                email: email,
                password: password
            }
            let res = await axios.post(url, body)
            if(res.status == 200){
                localStorage.setItem(auth_key, JSON.stringify(res.data))
                return {
                    success: true,
                    user: res.data.user,
                    token: res.data.token,
                }
            }
        }catch(e){
            return {
                success: false,
                message: e.response.data.message
            }
        }
    },
    async register(payload){
        try{
            let url = api + 'api/register'
            let body = {
                firstname: payload.firstname,
                lastname: payload.lastname,
                email: payload.email,
                password: payload.password,
                password_confirm: payload.password_confirm
            }
            let res = await axios.post(url, body)
            if(res.status == 201){
                return {
                    success: true
                }
            }
        }catch(e){
            console.log(e.response.data.errors)
        }
    },
    getApiHeader(){
        if(token != ""){
            return{ 
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        }
    }
}
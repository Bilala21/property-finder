import { useRouter } from "next/router";

const auth = (id) => {
    const route = useRouter()

    localStorage.setItem("token",true)
    
    if(localStorage.getItem('token')){
        route.push("/")
        return false
    }    
    return true
  };
  
  export default auth;
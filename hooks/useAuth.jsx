import { useCallback } from "react";
import { useRouter } from 'next/router'
import axios from "axios";


export const useAuth = () => {
  const router = useRouter();

  const login = useCallback((id) => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => {
      if(res.data){
        router.push("/Registration");
      }else{
        alert("パスワードが違います");
      }
    }).catch(() => alert("ログインできません"));
  },[router]);
  return { login };
}
import { useCallback } from "react";
import { useRouter } from 'next/router';

export const useAuth = () => {
  const router = useRouter();

  const login = useCallback((id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(res => res.json())
    .then(josn => {
      if(josn.id){
        router.push("/Registration");
      }else{
        alert("パスワードが違います");
      }
    }).catch(() => alert("ログインできません"));
  },[router]);
  return { login };
}

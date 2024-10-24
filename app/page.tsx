'use client'

import { axiosInstance } from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUsers] = useState([])

  const getUsers = async () => {
    try{
      const resp = await axiosInstance.get('/users')
      setUsers(resp.data)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <h1>hello world</h1>
      {
        user.map((el: any) => (
          <div key={el._id}>
            <h2>name: {el.name}</h2>
            <h2>email: {el.email}</h2>
          </div>
        ))
      }
    </div>
  );
}

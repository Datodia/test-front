'use client'

import { SignInFormData, signInSchema } from "@/app/validators/signInSchema"
import { axiosInstance } from "@/lib/axiosInstance"
import { yupResolver } from "@hookform/resolvers/yup"
import { setCookie } from "cookies-next/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function SignIn() {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(signInSchema)
    })
    const router = useRouter()
    const [error, setError] = useState('')

    const onSubmit = async (data: SignInFormData) => {
        try{
            setError('')
            const res = await axiosInstance.post('/auth/sign-in', data)
            if(res.status === 201){
                setCookie('accessToken', res.data.accessToken, {maxAge: 60 * 60})
                router.push('/dashboard')
            }
        }catch(e: any){
            console.log(e.response.data.message, "erro")
            setError(e.response.data.message)
        }
    }

  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit(onSubmit)} className='size-[300px] bg-gray-400 p-4 rounded-md flex flex-col gap-2'>
        <h1>Sign In</h1>

        <input type="text" placeholder='email' {...register('email')}  />
        <p className="text-red-600">{errors.email?.message}</p>
        <input type="password" placeholder='password' {...register('password')}  />
        <p className="text-red-600">{errors.password?.message}</p>
        <p className="text-red-600">{error}</p>

        <button className="bg-blue-500">Sign-In</button>
        <Link className="text-blue-600" href={'/sign-up'}>Sign-up</Link>
      </form>
    </div>
  )
}

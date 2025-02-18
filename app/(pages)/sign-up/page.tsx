'use client'
'@typescript-eslint/no-explicit-any'
import { SignUpFormData, singUpSchema } from "@/app/validators/signUpSchema"
import { axiosInstance } from "@/lib/axiosInstance"
import { yupResolver } from "@hookform/resolvers/yup"
import { setCookie } from "cookies-next"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export default function SignUp() {
  const queryParams = useSearchParams()

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(singUpSchema)
    })
    const router = useRouter()
    const [error, setError] = useState('')

    const onSubmit = async (data: SignUpFormData) => {
        try{
            const res = await axiosInstance.post('/auth/sign-up', data)
            if(res.status === 201){
                router.push('/sign-in')
            }
        }catch(e: any){
            console.log(e.response.data.message, "erro")
            setError(e.response.data.message)
        }
    }

    const getCurrentUser = async (token: string) => {
      try{
        const res = await axiosInstance.get('/auth/current-user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if(res){
          setCookie('accessToken', token, {maxAge: 60 * 60 * 1000})
          router.push('/dashboard')
        }
      }catch(e){
        console.log(e)
      }
    }

     useEffect(() => {
          const token = queryParams.get('token')
          if(token){
            getCurrentUser(token as string)
          }
        }, [])
    
        const handleGoogleAuth = () => {
          window.location.href = `http://localhost:3000/auth/google`
        }

  return (
    <div className='flex justify-center flex-col items-center h-screen'>
      <form onSubmit={handleSubmit(onSubmit)} className='size-[300px] bg-gray-400 p-4 rounded-md flex flex-col gap-2'>
        <h1>Sign Up</h1>
        <input type="text" placeholder='fullName' {...register('fullName')}  />
        <p className="text-red-600">{errors.fullName?.message}</p>
        <input type="text" placeholder='email' {...register('email')}  />
        <p className="text-red-600">{errors.email?.message}</p>
        <input type="password" placeholder='password' {...register('password')}  />
        <p className="text-red-600">{errors.password?.message}</p>
        <p className="text-red-600">{error}</p>

        <button className="bg-blue-500">Sign-up</button>
        <Link className="text-blue-600" href={'/sign-in'}>Sign-in</Link>
      </form>
      <button 
                onClick={handleGoogleAuth}
                className="flex gap-2 bg-white p-2"
              >
                Sign In with Google
                <Image 
                  src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu5KVVn2gwGUAhs4GdtFBTDXpQ3qgZQYvZUg&s'}
                  alt="google"
                  width={40}
                  height={30}
                />
              </button>
    </div>
  )
}

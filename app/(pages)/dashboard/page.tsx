'use client'
'react-hooks/exhaustive-deps'
import { axiosInstance } from "@/lib/axiosInstance"
import { deleteCookie } from "cookies-next"
import { getCookie } from "cookies-next/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { use, useEffect, useState } from "react"

type User = {
    _id: string,
    fullName: string,
    email: string,
    avatar: string,
    posts: Post[]
}

type Post = {
    _id: string
    title: string,
    content: string
    user: PostUser
}

type PostUser = {
    fullName: string,
    email: string
}

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null)
    const [posts, setPosts] = useState<Post[]>([])
    const [users, setUsers] = useState<User[]>([])
    const router = useRouter()

    const getCurrentUser = async (token: string) => {
        try {
            const res = await axiosInstance.get('/auth/current-user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setUser(res.data)
        } catch (e) {
            console.log(e)
            router.push('/sign-in')
        }
    }

    const getAllPosts = async (token: string) => {
        const res = await axiosInstance.get('/posts', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setPosts(res.data)
    }

    const getAllUsers = async (token: string) => {
        const res = await axiosInstance.get('/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setUsers(res.data)
    }

    useEffect(() => {
        const token = getCookie('accessToken')
        getCurrentUser(token as string)
        getAllPosts(token as string)
        getAllUsers(token as string)
    }, [])

    const handleSignOut = () => {
        deleteCookie('accessToken')
        router.push('/sign-in')
    }


    if (!user) return null

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="flex gap-2">
                <h1 className="font-semibold">{user.email}</h1>
                <Image
                    src={user.avatar}
                    alt={user.avatar}
                    width={30}
                    height={30}
                />
            </div>
            <button onClick={handleSignOut} className="p-2 bg-blue-500 rounded-sm text-white ">
                Sign Out
            </button>

            <div className="border-2 boder-black p-2">
                {users.map(u => (
                    <div className="border-2 border-black p-2 flex gap-2">
                        <p>{u.fullName}</p>
                        <p>{u.email}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-4">
                    {posts.map(el => (
                        <div key={el._id} className="size-[200px] border-2 border-black p-2 rounded-lg">
                            <h1>Title: {el.title}</h1>
                            <h1>content: {el.content}</h1>
                            <h3>fullName: {el?.user?.fullName}</h3>
                            <h3>email: {el?.user?.email}</h3>
                        </div>
                    ))}
            </div>
        </div>
    )
}

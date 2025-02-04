
import * as Yup from 'yup'

export const signInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('email is required'),
    password: Yup.string().required('password is required').min(6, "min 6 chars").max(20, 'max 20 chars')
})

export type SignInFormData = Yup.InferType<typeof signInSchema>

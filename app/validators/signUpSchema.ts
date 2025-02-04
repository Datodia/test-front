
import * as Yup from 'yup'

export const singUpSchema = Yup.object().shape({
    fullName: Yup.string().required('fullName is required'),
    email: Yup.string().email('Invalid email').required('email is required'),
    password: Yup.string().required('password is required').min(6, "min 6 chars").max(20, 'max 20 chars')
})

export type SignUpFormData = Yup.InferType<typeof singUpSchema>

import * as yup from 'yup'

const validations = yup.object().shape({
    firstName: yup.string().min(3,'İsim 3 karakterden az olamaz.' ).required('Zorunlu alan.'),
    lastName: yup.string().min(2,'Soyisim 2 karakterden az olamaz.').required('Zorunlu alan.'),
    email: yup.string().email('Geçerli bir email giriniz.').required('Zorunlu alan.'),
    password: yup.string().min(6,'Parola çok kısa').required("Zorunlu alan."),
    passwordConfirm: yup.string().min(6).oneOf([yup.ref('password')],'Parolalar uyuşmuyor').required("Zorunlu alan.")
})

export default validations
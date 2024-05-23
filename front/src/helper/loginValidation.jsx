import * as yup from 'yup';

const loginSchema = yup.object().shape({
    email: yup.string().email().required("Please enter email"),
    password : yup.string().required("Please enter password")
});

export default loginSchema;

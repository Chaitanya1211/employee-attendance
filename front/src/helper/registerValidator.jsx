
import * as yup from 'yup';

const registerSchema = yup.object().shape({
    firstName: yup.string().required("Please enter name"),
    lastName: yup.string().required("Please enter surname"),
    dateOfBirth: yup.string().required("Please select date of birth"),
    gender: yup.string().required("Please select gender"),
    contactNumber: yup.string()
        .matches(/^\d+$/, "Please enter valid phone number")
        .min(10, "Please enter valid phone number")
        .max(10, "Please enter valid phone number")
        .required("Please enter contact number"),
    addline1: yup.string().required("Please enter address"),
    city: yup.string().required("Please enter city"),
    state: yup.string().required("Please select state"),
    postalCode: yup.string().required("Please enter Pin code"),
    emerName: yup.string().required("Please enter name"),
    emerRelation: yup.string().required("Please enter relation"),
    emerPhoneNo: yup.string()
        .matches(/^\d+$/, "Please enter valid phone number")
        .min(10, "Please enter valid phone number")
        .max(10, "Please enter valid phone number")
        .required("Please enter number"),
    password: yup.string().required("Please enter password"),
    cpassword: yup.string().required("Please confirm password")
        .oneOf([yup.ref('password'), null], 'Passwords do not match')
});

export default registerSchema;

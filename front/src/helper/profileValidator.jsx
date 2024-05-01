
import * as yup from 'yup';

const profileSchema = yup.object().shape({
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
        .required("Please enter number")
});

export default profileSchema;

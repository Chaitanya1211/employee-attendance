
import * as yup from 'yup';

const inviteSchema = yup.object().shape({
    email: yup.string().email().required("Please enter email"),
    role : yup.string().required("Please select role")
});

export default inviteSchema;

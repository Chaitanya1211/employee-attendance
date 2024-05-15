import * as yup from 'yup';

const bugSchema = yup.object().shape({
    title: yup.string().required("Please enter bug title"),
    description : yup.string().required("Please enter bug description"),
    assignedTo : yup.string().required("Please select an employee"),
    qa_status : yup.string().required("Please select status"),
    priority : yup.string().required("Please select priority"),
});

export default bugSchema;
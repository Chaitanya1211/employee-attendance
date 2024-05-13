import * as yup from 'yup';

const projectSchema = yup.object().shape({
    projectName: yup.string().required("Please enter Project title"),
});

export default projectSchema;

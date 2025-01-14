import * as yup from "yup";

// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const signupSchema = yup.object().shape({
  fullname: yup.string().required("Please enter your full name"),
  // id is CR Number, -Validate CR number for 10 digits ( number only )
  id: yup
    .number()
    .typeError("CR number is not valid should be a number")
    .positive("CR number is not valid should be a positive number")
    .integer("CR number is not valid")
    .min(1000000000, "CR number is not valid, should be 10 digits")
    .max(9999999999, "CR number is not valid, should be 10 digits")
    .required("Please enter your CR number"),
  customer_company: yup.string().required("Please enter your company name"),
  email: yup.string().email().required("Please enter your email"),
  mobile: yup
    .number()
    .typeError("Phone number is not valid should be a number")
    .positive("Phone number is not valid should be a positive number")
    .integer("Phone number is not valid")
    .min(100000000, "Phone number is not valid, should be 9 digits")
    .max(999999999, "Phone number is not valid, should be 9 digits")
    // .matches(phoneRegExp, "Phone number is not valid")
    .required("Please enter your phone number"),
  password: yup.string().required("Please enter your password"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

export default signupSchema;

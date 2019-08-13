// import React from "react";
// import { Formik } from "formik";
// // import { Input, Button, Form } from "semantic-ui-react";

// const Login = () => (
//   <div>
//     <h1>Matcha</h1>
//     <h3>Login</h3>
//     <Formik
//       initialValues={{ email: "", password: "" }}
//       validate={values => {
//         let errors = {};
//         if (!values.email) {
//           errors.email = "Required";
//         } else if (
//           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//         ) {
//           errors.email = "Invalid email address";
//         }
//         return errors;
//       }}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2));
//           setSubmitting(false);
//         }, 400);
//       }}
//     >
//       {({
//         values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         isSubmitting
//         /* and other goodies */
//       }) => (
//         {/* <Form style={{}} onSubmit={handleSubmit}> */}
//           <Form.Field>
//             <label>Email</label>
//             {/* <input */}
//               placeholder="Email"
//               type="email"
//               name="email"
//               onChange={handleChange}
//               onBlur={handleBlur}
//               value={values.email}
//             />
//           {/* </Form.Field> */}
//           {errors.email && touched.email && errors.email}
//           {/* <Form.Field> */}
//             <label>Password</label>
//             <input
//               placeholder="Password"
//               type="password"
//               name="password"
//               onChange={handleChange}
//               onBlur={handleBlur}
//               value={values.password}
//             />
//           {/* </Form.Field> */}

//           {errors.password && touched.password && errors.password}

//           <Button type="submit" disabled={isSubmitting}>
//             Submit
//           </Button>
//         {/* </Form> */}
//       )}
//     {/* </Formik> */}
//   {/* </div> */}
// );

// export default Login;

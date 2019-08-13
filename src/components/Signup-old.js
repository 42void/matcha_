import React from "react";
import { Button, Form } from "semantic-ui-react";
import { Formik } from "formik";

const FormStyle = {
  maxWidth: "80%",
  width: 500,
  margin: "auto"
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  margin: 30
  // backgroundColor:'blue'
};

export default class extends React.Component {

  render() {
    return (
      <div style={FormStyle}>
        <h1>MATCHA</h1>
        <h3>SIGN UP</h3>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validate={values => {
            let errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={values => {console.log(values)}}
          render={({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>Email</label>
                <input
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={values.email}
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                />
              </Form.Field>
              <Form.Field>
                <label>Confirm password</label>
                <input
                  onChange={handleChange}
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={values.confirmPassword}
                />
              </Form.Field>
              <Form.Field>
                {/* <Checkbox label='I agree to the Terms and Conditions' /> */}
              </Form.Field>
              <div style={buttonContainerStyle}>
                <Button color="blue" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          )}
        />
      </div>
    );
  }
}

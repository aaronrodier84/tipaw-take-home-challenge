import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';

import AuthService from "../services/auth.service";

interface RouterProps {
  history: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  password: string,
  acceptTerms: boolean,
  successful: boolean,
  message: string
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
      acceptTerms: false,
      successful: false,
      message: ""
    };
  }

  validationSchema() {
    return Yup.object().shape({
      firstname: Yup.string()
        .required("This field is required!"),
      lastname: Yup.string()
        .required('Last Name is required'),
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      phone: Yup.string()
        .required('Phone Number is required')
        .min(10, 'Phone Number must be at least 10 characters'),
      password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 8
        )
        .required("This field is required!"),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
      acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
    });
  }

  handleRegister(formValue: { firstname: string, lastname: string, phone: string, email: string, password: string, acceptTerms: boolean }) {
    const { firstname, lastname, email, password, phone, acceptTerms } = formValue;

    this.setState({
      message: "",
      successful: false
    });

    AuthService.register(
      firstname,
      lastname,
      phone,
      email,
      password,
      acceptTerms,
    ).then(
      response => {
        toast.success('Registeration successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.setState({
          message: response.data.message,
          successful: true
        });
        this.props.history.push("/login");
        window.location.reload();
      },
      error => {
        console.log(error);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(error.response.data.error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.setState({
          successful: false,
          message: resMessage
        });

      }
    );
  }

  render() {
    const { successful, message } = this.state;

    const initialValues = {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
      acceptTerms: false
    };

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label>First Name</label>
                    <Field name="firstname" type="text" className="form-control" />
                    <ErrorMessage
                      name="firstname"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                    <Field name="lastname" type="text" className="form-control" />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                    
                  <div className="form-group">
                    <label>Phone number</label>
                    <Field name="phone" type="text" className="form-control" />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>  

                  <div className="form-group">
                    <label htmlFor="email"> Email </label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password"> Password </label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Confirm Password </label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      name="acceptTerms"
                      id="acceptTerms"
                      type="checkbox"
                      className="form-check-input ml0"
                    />
                    <label htmlFor="acceptTerms" className="form-check-label ml2">
                      I have read and agree to the Terms
                    </label>
                    <ErrorMessage
                      name="acceptTerms"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </div>
              )}
              <ToastContainer />
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";
import Background from "../assets/img/2.jpg";
import { Link, Redirect } from "react-router-dom";
const axios = require('axios');

class ResetPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      resetPassword: "",
      resetPasswordConfirmation: "",
      goBackHover: false,
      connectionHover: false,
      forgotPwdHover: false,
      redirect: false,
      pwErrorMsg: ""
    };
  }

  toggleGoBackHover = () => {
    this.setState({ goBackHover: !this.state.goBackHover });
  };

  toggleConnectionHover = () => {
    this.setState({ connectionHover: !this.state.connectionHover });
  };

  toggleForgotPwdHover = () => {
    this.setState({ forgotPwdHover: !this.state.forgotPwdHover });
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      resetPassword,
      redirect,
      resetPasswordConfirmation
    } = this.state;

    const token = this.props.location.pathname.slice(15)

    if (redirect) {
      return <Redirect to="/" />;
    }

    const goBack = {
      textAlign: "center",
      fontSize: 14,
      marginBottom: "1.2em",
      color: this.state.goBackHover ? "#900000" : "#400000",
      marginTop: "1rem"
    };

    const button = {
      margin: "auto",
      width: "60%",
      backgroundColor: this.state.connectionHover ? "#5D0101" : "#400000",
      color: "white"
    };

    return (
      <div style={pageContainer2}>
        <h1 style={title}>MATCHA</h1>
        <h1 style={tagLine}>Love is in the air</h1>

        <form style={loginFormContainer}
          onSubmit={
            (e) => {
              e.preventDefault()
              if (resetPassword !== resetPasswordConfirmation) {
                this.setState({
                  pwErrorMsg: "Les mots de passe ne correspondent pas "
                });
              } else if (
                !/\d/.test(this.state.resetPassword) ||
                !/[a-z]/.test(this.state.resetPassword) ||
                !/[A-Z]/.test(this.state.resetPassword)
              ) {
                this.setState({
                  pwErrorMsg:
                    "Le mot de passe doit contenir au moins 6 caractères dont 1 chiffre, une majuscule"
                });
              } else {
                this.setState({ pwErrorMsg: "" });
                axios.post('http://localhost:4000/resetPassword', { resetPassword, token })
                  .then((response) => {
                    if (response.status === 200 && response.data === "password changed") {
                      this.setState({ pwErrorMsg: "Votre mot de passe a bien été changé. Redirection vers page de login" })
                      setTimeout(() => { this.setState({ redirect: true }) }, 5000);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            }
          }>
          <h3 style={pageTitle}>Réinitialisation mot de passe</h3>
          <div style={inputContainer}>
            <Input
              style={input}
              placeholder="Veuillez entrer votre nouveau mot de passe"
              type="password"
              name="resetPassword"
              value={resetPassword}
              onChange={this.onChange}
            />
          </div>
          <div style={inputContainer}>
            <Input
              style={input}
              placeholder="Veuillez confirmer votre nouveau mot de passe"
              type="password"
              name="resetPasswordConfirmation"
              value={resetPasswordConfirmation}
              onChange={this.onChange}
            />
          </div>
          <p style={pwdAdvice}>
            {this.state.pwErrorMsg}
          </p>
          <Button
            onMouseEnter={this.toggleConnectionHover}
            onMouseLeave={this.toggleConnectionHover}
            style={button}
          >
            Valider
          </Button>
          <Link
            to="/"
            onMouseEnter={this.toggleGoBackHover}
            onMouseLeave={this.toggleGoBackHover}
            style={goBack}
          >
            Retour
          </Link>
        </form>
      </div>
    );
  }
}

const title = {
  textAlign: "center",
  fontSize: 70,
  marginTop: "4rem",
  color: "#400000"
};

const tagLine = {
  marginTop: "-2rem",
  marginBottom: "2rem",
  textAlign: "center",
  fontFamily: "Caveat",
  fontSize: 26
};

const loginFormContainer = {
  flexDirection: "column",
  display: "flex",
  width: "80%",
  maxWidth: 300,
  margin: "auto"
};

const inputContainer = {
  display: "flex"
};

const input = {
  width: "100%",
  marginBottom: 16
};

const pwdAdvice = {
  textAlign: "center"
};

const pageContainer2 = {
  height: "100%",
  position: "fixed",
  width: "100%",
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover"
};

const pageTitle = {
  textAlign: "center"
};


export default ResetPwd;

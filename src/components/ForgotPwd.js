import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";
import Background from "../assets/img/2.jpg";
import { Link, Redirect } from "react-router-dom";
const axios = require('axios');

class ForgotPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      goBackHover: false,
      connectionHover: false,
      forgotPwdHover: false,
      redirect: false,
      errorMsg: ""
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
    const { email, redirect } = this.state;
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
        <form style={loginFormContainer} onSubmit={
          (e) => {
            e.preventDefault();
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!this.state.email) {
              this.setState({
                errorMsg: "Veuillez entrer votre adresse email"
              });
            } else if (!re.test(String(email).toLowerCase())) {
              this.setState({
                errorMsg: "Cette adresse email n'est pas valide"
              });
            } else {
              axios.post('http://localhost:4000/forgotPwd', { email })
                .then((response) => {
                  console.log("response FP", response)
                  console.log("length", response.data.length)
                  if (response.status === 200 && response.data.length > 0) {
                    console.log("response front", response);
                    this.setState({
                      errorMsg: "Un email vient de vous être envoyé"
                    });
                    setTimeout(() => {
                      this.setState({ redirect: true });
                    }, 3000);
                  } else {
                    this.setState({
                      errorMsg: "Aucun membre ne correspond à cet email"
                    });
                  }
                })
            }
          }
        }>
          <h3 style={forgotPwdQuestion}>Mot de passe oublié ?</h3>
          <div style={forgotPwdText}>
            Matcha va vous envoyer un mail contenant un lien qui vous
            permettra de rentrer un nouveau mot de passe afin de vous
            connecter de nouveau !
                </div>
          <div style={inputContainer}>
            <Input
              style={input}
              placeholder="Veuillez entrer votre adresse email"
              type="email"
              name="email"
              value={email}
              onChange={this.onChange}
            />
          </div>
          <p style={{ textAlign: "center" }}>{this.state.errorMsg}</p>
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
  marginBottom: 20
};

const pageContainer2 = {
  height: "100%",
  position: "fixed",
  width: "100%",
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover"
};

const forgotPwdQuestion = {
  textAlign: "center"
};

const forgotPwdText = {
  textAlign: "center",
  marginBottom: "0.5rem"
};

export default ForgotPwd;

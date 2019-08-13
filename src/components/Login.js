import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";
import Background from "../assets/img/2.jpg";
import { Link, Redirect } from "react-router-dom";
const axios = require('axios');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      inscriptionHover: false,
      connectionHover: false,
      forgotPwdHover: false,
      redirect: false,
      errorMsg: ""
    };
  }

  toggleInscriptionHover = () => {
    this.setState({ inscriptionHover: !this.state.inscriptionHover });
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
    const { email, password, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/home/" />;
    }

    const inscription = {
      textAlign: "center",
      fontSize: 18,
      marginBottom: "1.2em",
      color: this.state.inscriptionHover ? "#900000" : "#400000"
    };

    const button = {
      margin: "auto",
      width: "60%",
      backgroundColor: this.state.connectionHover ? "#5D0101" : "#400000",
      color: "white"
    };

    const forgotPwd = {
      textAlign: "center",
      marginTop: "1em",
      color: this.state.forgotPwdHover ? "#900000" : "#400000"
    };

    return (
      <div style={pageContainer2}>
        <h1 style={title}>MATCHA</h1>
        <h3 style={tagLine}>Love is in the air</h3>
        <form style={loginFormContainer}
          onSubmit={(e) => {
            e.preventDefault()
            if (!this.state.email)
              this.setState({
                errorMsg: "Veuillez entrer votre email"
              });
            else if (!this.state.password)
              this.setState({
                errorMsg: "Veuillez entrer votre mot de passe"
              })
            else {
              axios.post('http://localhost:4000/login', { email, password }, {withCredentials: true})
                .then((response) => {
                  if (response.status === 200 && response.data.length > 0) {
                    if (response.data[0].confirmed === 0) {
                      this.setState({
                        errorMsg:
                          "Veuillez confirmer votre email en cliquant sur le lien qui vous a été envoyé"
                      });
                    } else {
                      this.setState({ redirect: true });
                    }
                  } else {

                    this.setState({
                      errorMsg: "Mauvais email et/ou mot de passe"
                    });
                  }
                })
                .catch((error) => {
                  console.log(error);
                })
            }
          }}
        >
          <div style={inputContainer}>
            <Input
              style={input}
              placeholder="E-mail"
              type="text"
              name="email"
              value={email}
              onChange={this.onChange}
            />
          </div>
          <div style={inputContainer}>
            <Input
              style={input}
              placeholder="Mot de passe"
              type="password"
              name="password"
              value={password}
              onChange={this.onChange}
            />
          </div>
          <p style={{ textAlign: "center" }}>{this.state.errorMsg}</p>
          <Button
            onMouseEnter={this.toggleConnectionHover}
            onMouseLeave={this.toggleConnectionHover}
            style={button}

          >
            Connexion
            </Button>
          <Link
            onMouseEnter={this.toggleForgotPwdHover}
            onMouseLeave={this.toggleForgotPwdHover}
            to="/forgotPassword"
            style={forgotPwd}
          >
            Vous avez oublié votre mot de passe ?
            </Link>
          <div style={notAMember}>Pas encore membre ?</div>
          <Link
            to="/register"
            onMouseEnter={this.toggleInscriptionHover}
            onMouseLeave={this.toggleInscriptionHover}
            style={inscription}
          >
            Inscrivez-vous gratuitement
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

const notAMember = {
  textAlign: "center",
  marginTop: "1em"
};

const pageContainer2 = {
  height: "100%",
  position: "fixed",
  width: "100%",
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover"
};

export default Login;
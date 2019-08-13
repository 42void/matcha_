import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";
import Background from "../assets/img/2.jpg";

import { Link, Redirect } from "react-router-dom";
const axios = require('axios');

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname:"",
      lastname:"",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      inscriptionHover: false,
      connectionHover: false,
      gender: "",
      lookingFor: "",
      pwErrorMsg: "",
      emailErrorMsg: "",
      serverMsg: "",
      redirect: false
    };
  }

  toggleInscriptionHover = () => {
    this.setState({ inscriptionHover: !this.state.inscriptionHover });
  };

  toggleConnectionHover = () => {
    this.setState({ connectionHover: !this.state.connectionHover });
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleChange = (e) => this.setState({ gender: e.target.value });
  handleChange2 = (e) => this.setState({ lookingFor: e.target.value });

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      passwordConfirmation,
      gender,
      lookingFor,
      redirect
    } = this.state;

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
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
        <div style={pageContainer2}>
          <h1 style={title}>MATCHA</h1>
          <h3 style={tagLine}>Love is in the air</h3>
          <form onSubmit={(e) => {
            e.preventDefault()
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(email).toLowerCase())) {
              this.setState({
                emailErrorMsg: "Cette adresse email n'est pas valide"
              });
            } else {
              this.setState({
                emailErrorMsg: ""
              });
            }
            if (password !== passwordConfirmation) {
              this.setState({
                pwErrorMsg: "Les mots de passe ne correspondent pas "
              });
            } else if (
              !/\d/.test(this.state.password) ||
              !/[a-z]/.test(this.state.password) ||
              !/[A-Z]/.test(this.state.password)
            ) {
              this.setState({
                pwErrorMsg:
                  "Le mot de passe doit contenir au moins 6 caractères dont 1 chiffre, une majuscule"
              });
            } else {
              this.setState({ pwErrorMsg: "" });
              if (this.state.emailErrorMsg === "") {
                console.log(this.state)
                axios.post('http://localhost:4000/register', {
                  firstname,
                  lastname,
                  username,
                  email,
                  password,
                  gender,
                  lookingFor
                })
                  .then((response) => {
                    if (response.status === 200) {
                      this.setState({ pwErrorMsg: "Un email vient de vous être envoyé, merci de confirmer votre adresse en cliquant sur le lien" })
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            }
          }}>
            <div style={loginFormContainer}>
              <div style={inputContainer}>
                <Input
                  style={input}
                  placeholder="First name"
                  type="text"
                  name="firstname"
                  value={firstname}
                  onChange={this.onChange}
                />
              </div>
              <div style={inputContainer}>
                <Input
                  style={input}
                  placeholder="Last name"
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={this.onChange}
                />
              </div>
              <div style={inputContainer}>
                <Input
                  style={input}
                  placeholder="Username"
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.onChange}
                />
              </div>
              <div style={inputContainer}>
                <Input
                  style={input}
                  placeholder="E-mail"
                  type="email"
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
              <div style={inputContainer}>
                <Input
                  style={input}
                  placeholder="Confirmation mot de passe"
                  type="password"
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={this.onChange}
                />
              </div>
      

              {/* <div style={checkBoxContainer}>
                <div style={{fontWeight:'bold'}}>Je suis :</div>
                <form>
                  <div>
                    <label style={label}>
                      <input
                        type="radio"
                        name="checkboxRadioGroup"
                        value="male"
                        checked={this.state.gender === "male"}
                        onChange={this.handleChange}
                      />
                      <span style={labelText}>Un homme</span>
                    </label>
                  </div>

                  <div className="form-check">
                    <label style={label}>
                      <input
                        type="radio"
                        name="checkboxRadioGroup"
                        value="female"
                        checked={this.state.gender === "female"}
                        onChange={this.handleChange}
                      />
                      <span style={labelText}>Une femme</span>
                    </label>
                  </div>
                </form>
              </div> */}
              {/* <div style={checkBoxContainer}>
                <div style={{fontWeight:'bold'}}>Je recherche :</div>
                <form style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={label}>
                    <input
                      type="radio"
                      label="Un homme"
                      name="checkboxRadioGroup2"
                      value="male"
                      checked={this.state.lookingFor === "male"}
                      onChange={this.handleChange2}
                    /><span style={labelText}>Un homme</span>
                  </label>
                  <label style={label}>
                    <input
                      type="radio"
                      label="Une femme"
                      name="checkboxRadioGroup2"
                      value="female"
                      checked={this.state.lookingFor === "female"}
                      onChange={this.handleChange2}
                    /><span style={labelText}>Une femme</span>
                  </label>
                  <label style={label}>
                    <input
                      type="radio"
                      label="Peu importe"
                      name="checkboxRadioGroup2"
                      value="both"
                      checked={this.state.lookingFor === "both"}
                      onChange={this.handleChange2}
                    /><span style={labelText}>Peu importe</span>
                  </label>
                </form>
              </div> */}
              <div style={errorMessagesContainer}>
                <div style={pwErrorMsg}>{this.state.pwErrorMsg}</div>
                <div>{this.state.emailErrorMsg}</div>
                <div>{this.state.serverMsg}</div>
              </div>
              <Button
                onMouseEnter={this.toggleConnectionHover}
                onMouseLeave={this.toggleConnectionHover}
                style={button}
              >
                Je m'inscris
                  </Button>
              <div style={notAMember}>Déjà membre ?</div>
              <Link
                to="/"
                onMouseEnter={this.toggleInscriptionHover}
                onMouseLeave={this.toggleInscriptionHover}
                style={inscription}
              >
                Connectez-vous ici
                  </Link>
            </div>
          </form>
        </div>
    );
  }
}

const errorMessagesContainer = {
  "display": "flex",
  "flexDirection": "column", 
  "justifyContent": "center", 
  "alignItems": "center", 
  "marginBottom": "1rem", 
  "textAlign": "center" 
}

// const label = {
//   display: 'flex',
//   alignItems: 'center',
//   margin:10
// }

// const labelText = {
//   display:'inline-block',
//   marginLeft:10,
// }

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

// const checkBoxContainer = {
//   marginBottom: "3rem",
//   fontSize: 16
// };

const notAMember = {
  textAlign: "center",
  marginTop: "1em"
};

const pageContainer2 = {
  height: "100%",
  position: "fixed",
  width: "100%",
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
  overflow: "scroll",
  marginBottom:'3rem'
};

const pwErrorMsg = {
  color: "red"
};

export default Register;

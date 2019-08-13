import React, { Component } from "react";
import { Button, Icon, Modal, Header, Input } from "semantic-ui-react";
const axios = require('axios');

export default class ModifyPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      password: "",
      passwordConfirmation: "",
      pwErrorMsg: ''
    };
  }

  close = () => this.setState({ open: false });

  handleChange = e => this.setState({ password: e.target.value });
  handleChangeConfirmation = e => this.setState({ passwordConfirmation: e.target.value });

  render() {
    const { open, password, passwordConfirmation } = this.state;
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginRight: "10px", marginBottom: "10px" }}>
            <span style={{ fontWeight: "bold", fontSize: "15px" }}>
              Votre mot de passe
                </span>
            : [secret]
              </div>
          <Modal
            open={open}
            onClose={this.close}
            size="tiny"
            trigger={
              <button
                title="Modifier"
                onClick={() => this.setState({ open: true })}
                style={{
                  marginBottom: "10px",
                  cursor: "pointer",
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent"
                }}
              >
                <Icon color={"blue"} name="pencil" />
              </button>
            }
          >
            <Header
              icon="lock"
              content="Modification de votre mot de passe"
            />
            <Modal.Content>
              <p>Votre nouveau mot de passse :</p>
            </Modal.Content>
            <Modal.Content>
              <Input
                type="password"
                onChange={this.handleChange}
                style={{ width: "60%" }}
              />
            </Modal.Content>
            <Modal.Content>
              <p>Confirmation de votre nouveau mot de passse :</p>
            </Modal.Content>
            <Modal.Content>
              <Input
                type="password"
                onChange={this.handleChangeConfirmation}
                style={{ width: "60%" }}
              />
            </Modal.Content>
            <div style={{ marginLeft: 22, marginBottom: 20 }}>{this.state.pwErrorMsg}</div>
            <Modal.Actions>
              <Button color="red" inverted onClick={this.close}>
                <Icon type="remove" name="remove" /> Annuler
                  </Button>
              <Button
                color="green"
                inverted
                onClick={(e) => {
                  // e.preventDefault()
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
                    this.setState({ pwErrorMsg: "", open: false });

                    axios('http://localhost:4000/modifyPassword', {
                      method: "post",
                      data: password,
                      withCredentials: true
                    })
                      .then((response) => {
                        if (response.status === 200 && response.data === "password changed") {
                          console.log("modify password response", response);
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }
                }}
              >
                <Icon name="checkmark" /> Valider
                  </Button>
            </Modal.Actions>
          </Modal>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Button, Icon, Modal, Header, Input } from "semantic-ui-react";
const axios = require('axios');

export default class ModifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      email: ""
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/getUserInfos`, { withCredentials: true })
      .then((res) => {
        this.setState({ email: res.data[0] ? res.data[0].email : null })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  close = () => this.setState({ open: false });

  handleChange = (e) => this.setState({ email: e.target.value })

  render() {
    const { open, email } = this.state;
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginRight: "10px", marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold', fontSize: "15px" }}>Adresse email</span> : {this.state.email}
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
              content="Modification de votre adresse email"
            />
            <Modal.Content>
              <p>Votre nouvelle adresse email :</p>
            </Modal.Content>
            <div style={{ marginLeft: 22 }}>{this.state.emailErrorMsg}</div>
            <Modal.Content>
              <Input type="email" onChange={this.handleChange} style={{ width: "60%" }} />
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" inverted onClick={this.close}>
                <Icon type="remove" name="remove" /> Annuler
                  </Button>
              <Button
                color="green"
                inverted
                onClick={() => {
                  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  if (!re.test(String(email).toLowerCase())) {
                    this.setState({
                      emailErrorMsg: "Cette adresse email n'est pas valide"
                    });
                  } else {
                    this.setState({
                      emailErrorMsg: ""
                    });

                    axios('http://localhost:4000/modifyEmail', {
                      method: "post",
                      data: email,
                      withCredentials: true
                    })
                      .then((response) => {
                        if (response.status === 200) {
                          this.setState({ open: false })
                          console.log("response modify username", response)
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

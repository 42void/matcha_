import React, { Component } from "react";
import { Button, Icon, Modal, Header, Input } from "semantic-ui-react";
const axios = require('axios');

export default class ModifyFirstname extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      firstname: ""
    };
  }
  
  componentDidMount() {
    axios.get(`http://localhost:4000/getUserInfos`, { withCredentials: true })
      .then((res) => {
        this.setState({ firstname: res.data[0] ? res.data[0].firstname : null })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  close = () => this.setState({ open: false });

  handleChange = (e) => this.setState({ firstname: e.target.value })

  render() {
    const { open, firstname } = this.state;
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginRight: "10px", marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold', fontSize: "15px" }}>Prénom</span> : {this.state.firstname}
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
              content="Modification de votre prénom"
            />
            <Modal.Content>
              <p>Votre nouveau prénom :</p>
            </Modal.Content>
            <Modal.Content>
              <Input type="text" onChange={this.handleChange} style={{ width: "60%" }} />
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" inverted onClick={this.close}>
                <Icon type="remove" name="remove" /> Annuler
                  </Button>
              <Button
                color="green"
                inverted
                onClick={() => {
                  axios('http://localhost:4000/modifyFirstname', {
                    method: "post",
                    data: firstname,
                    withCredentials: true
                  })
                    .then((response) => {
                      if (response.status === 200) {
                        this.setState({ open: false })
                        console.log("response modify firstname", response)
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
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

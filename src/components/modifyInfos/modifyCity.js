import React, { Component } from "react";
import { Button, Icon, Modal, Header, Input } from "semantic-ui-react";
const axios = require('axios');

export default class ModifyCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      town: ""
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/getUserInfos`, { withCredentials: true })
      .then((res) => {
        this.setState({ town: res.data[0] ? res.data[0].town : null })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  close = () => this.setState({ open: false });

  handleChange = (e) => this.setState({ town: e.target.value })

  render() {
    const { open, town } = this.state;
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginRight: "10px", marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold', fontSize: "15px" }}>Ville</span> : {this.state.town}
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
              content="Modification de votre ville"
            />
            <Modal.Content>
              <p>Votre nouvelle ville :</p>
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
                  axios('http://localhost:4000/modifyTown', {
                    method: "post",
                    data: town,
                    withCredentials: true
                  })
                    .then((response) => {
                      if (response.status === 200) {
                        this.setState({ open: false })
                        console.log("response modify town", response)
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

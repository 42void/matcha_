import React, { Component } from "react";
import { Button, Icon, Modal, Header } from "semantic-ui-react";
import "react-day-picker/lib/style.css";
const axios = require('axios');


export default class ModifyBirthdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      birthdate: ""
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/getUserInfos`, { withCredentials: true })
      .then((res) => {
        this.setState({ birthdate: res.data[0] ? res.data[0].age : null })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  close = () => this.setState({ open: false });

  handleChange = e => this.setState({ birthdate: e.target.value });

  switchLocale = e => {
    const locale = e.target.value || "fr";
    this.setState({ locale });
  };

  render() {
    const { open, birthdate } = this.state;
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginRight: "10px", marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold', fontSize: "15px" }}>Date de naissance</span> : {this.state.birthdate}
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
              content="Modification de votre date de naissance"
            />
            <Modal.Content>
              <p>Votre nouvelle date de naissance :</p>
            </Modal.Content>
            <Modal.Content>
              <p id="demo" />
              <input type="date" onChange={this.handleChange} />
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" inverted onClick={this.close}>
                <Icon type="remove" name="remove" /> Annuler
                  </Button>
              <Button
                color="green"
                inverted
                onClick={() => {
                  axios('http://localhost:4000/modifyBirthdate', {
                    method: "post",
                    data: birthdate,
                    withCredentials: true
                  })
                    .then((response) => {
                      if (response.status === 200) {
                        this.setState({ open: false })
                        console.log("response modify birthdate", response)
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

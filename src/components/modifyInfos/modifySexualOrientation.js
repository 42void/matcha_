import React, { Component } from "react";
import { Button, Icon, Modal, Header, Form } from "semantic-ui-react";
const axios = require('axios');

export default class ModifySexualOrientation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      sexualOrientation: ""
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/getUserInfos`, { withCredentials: true })
      .then((res) => {
        this.setState({ sexualOrientation: res.data[0] ? res.data[0].lookingFor : null })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  close = () => this.setState({ open: false });

  handleChange = changeEvent =>
    this.setState({ sexualOrientation: changeEvent.target.value });

  displaySexualOrientation = () => {
    if(this.state.sexualOrientation === 'male'){
      return "Un homme"
    } 
    if(this.state.sexualOrientation === 'female'){
      return "Une femme"
    }
    if(this.state.sexualOrientation === 'both'){
      return "Je n'ai pas de préférence"
    } 
  }

  render() {
    const { open, sexualOrientation } = this.state;
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginRight: "10px", marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold', fontSize: "15px" }}>Je recherche</span> : {this.displaySexualOrientation()}
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
            <Header icon="lock" content="Modification de votre orientation sexuelle" />
            <Modal.Content>
              <p>Je préfère :</p>
            </Modal.Content>
            <Modal.Content>
              <Form.Field>
                <label>
                  <input
                    style={{ margin: "10px" }}
                    type="radio"
                    name="checkboxRadioGroup"
                    value="male"
                    checked={this.state.sexualOrientation === "male"}
                    onChange={this.handleChange}
                  />
                  Les hommes
                    </label>
              </Form.Field>
              <Form.Field>
                <label>
                  <input
                    style={{ margin: "10px" }}
                    type="radio"
                    name="checkboxRadioGroup"
                    value="female"
                    checked={this.state.sexualOrientation === "female"}
                    onChange={this.handleChange}
                  />
                  Les femmes
                    </label>
              </Form.Field>
              <Form.Field>
                <label>
                  <input
                    style={{ margin: "10px" }}
                    type="radio"
                    name="checkboxRadioGroup"
                    value="both"
                    checked={this.state.sexualOrientation === "both"}
                    onChange={this.handleChange}
                  />
                  Pas de préférence
                    </label>
              </Form.Field>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" inverted onClick={this.close}>
                <Icon type="remove" name="remove" /> Annuler
                  </Button>
              <Button
                color="green"
                inverted
                onClick={() => {
                  axios('http://localhost:4000/modifySexualOrientation', {
                    method: "post",
                    data: sexualOrientation,
                    withCredentials: true
                  })
                    .then((response) => {
                      if (response.status === 200) {
                        this.setState({ open: false })
                        console.log("response modify sexualOrientation", response)
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

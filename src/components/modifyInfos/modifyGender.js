import React, { Component } from "react";
import { Button, Icon, Modal, Header, Form } from "semantic-ui-react";
const axios = require('axios');


export default class ModifyGender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      gender: ""
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/getUserInfos`, { withCredentials: true })
      .then((res) => {
        this.setState({ gender: res.data[0] ? res.data[0].gender : null })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  close = () => this.setState({ open: false });

  handleChange = changeEvent =>
    this.setState({ gender: changeEvent.target.value });

  displayGender = () => {
    if(this.state.gender === 'male'){
      return "Homme"
    }
    if(this.state.gender === 'female'){
      return "Femme"
    }
  }

  render() {
    const { open, gender } = this.state;
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginRight: "10px", marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold', fontSize: "15px" }}>Genre</span> : {this.displayGender()}
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
            <Header icon="lock" content="Modification de votre genre" />
            <Modal.Content>
              <p>Votre genre :</p>
            </Modal.Content>
            <Modal.Content>
              <Form.Field>
                <label>
                  <input
                    style={{ margin: "10px" }}
                    type="radio"
                    name="checkboxRadioGroup"
                    value="male"
                    checked={this.state.gender === "male"}
                    onChange={this.handleChange}
                  />
                  Un homme
                    </label>
              </Form.Field>
              <Form.Field>
                <label>
                  <input
                    style={{ margin: "10px" }}
                    type="radio"
                    name="checkboxRadioGroup"
                    value="female"
                    checked={this.state.gender === "female"}
                    onChange={this.handleChange}
                  />
                  Une femme
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
                  axios('http://localhost:4000/modifyGender', {
                    method: "post",
                    data: gender,
                    withCredentials: true
                  })
                    .then((response) => {
                      if (response.status === 200) {
                        this.setState({ open: false })
                        console.log("response modify gender", response)
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

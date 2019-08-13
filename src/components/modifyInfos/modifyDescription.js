import React, { Component } from "react";
import { Button } from "semantic-ui-react";
const axios = require('axios');

export default class ModifyDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      first:true
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/getUserInfos`, { withCredentials: true })
      .then((res) => {
        this.setState({ description: res.data[0] ? res.data[0].biography : null })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  close = () => this.setState({ open: false });

  handleChange = e => this.setState({ description: e.target.value, first:false });

  render() {
    const { description } = this.state;
    return (
      <div>
        <div style={loginFormContainer}>
          <h3>Ma description</h3>
          <textarea value={this.state.description ? this.state.description : this.state.first ? "Complétez votre description" : ""} onChange={this.handleChange} style={descriptionStyle} />
          <div style={buttonsContainer}>
            <Button
              style={button}
              color="brown"
              onClick={() => {
                axios('http://localhost:4000/modifyDescription', {
                  method: "post",
                  data: description,
                  withCredentials: true
                })
                  .then((response) => {
                    if (response.status === 200) {
                      this.setState({ open: false })
                      console.log("response modify description", response)
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              Enregistrer
                </Button>
          </div>
        </div>
      </div>
    );
  }
}


const descriptionStyle = {
  height: "12rem",
  resize: "none",
  WebkitBorderRadius: ".3rem",
  borderRadius: ".3rem",
  padding: "1rem",
  color: "rgba(80, 80, 80, 0.8)",
  outline: "none"
};

const buttonsContainer = {
  justifyContent: "center",
  display: "flex",
  alignSelf: "flex-end",
  alignItems: "center"
};

const button = {
  color: "white",
  // backgroundColor: this.state.connectionHover ? "#5D0101" : "#400000",
  margin: "5px 0px 0px 5px"
};

const loginFormContainer = {
  flexDirection: "column",
  display: "flex",
  width: "100%",
  //   maxWidth: 300,
  margin: "auto",
  marginTop: "100px",
  marginBottom: "50px"
};

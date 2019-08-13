import React, { Component } from "react";
import { Button, Icon } from "semantic-ui-react";

export default class MyProfilePhoto extends Component {
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: "204px",
            margin: "1rem 1rem 0rem 0",
            borderRadius: "5px",
            boxShadow: "rgba(80, 80, 80, 0.6) 2px 2px 1px",
            flexDirection: "column"
          }}
        >
          <div
            style={{
              height: "240px",
              backgroundImage: 'url("http://lorempixel.com/640/480/people")',
              backgroundSize: "cover"
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Button style={button}>
            <Icon style={icon} name="cancel" />
          </Button>
        </div>
      </div>
    );
  }
}

const button = {
  width: 16,  
  marginTop:2
};

const icon = {
  display:"initial"
};

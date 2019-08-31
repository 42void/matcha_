import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

export default class ProfileCard extends Component {

  render() {
    const { image_path, username, age, town, id } = this.props.userinfo;
    let path_image = "http://localhost:4000/" + ( image_path ? image_path : "uploads/defaultPP.png") 

    const newTo = {
      pathname: `/profile/${id}`,
      param1: id
    };
    return (
      <div style={profileCard}>
        <div
          style={{
            height: "240px",
            backgroundImage: `url(${path_image})`,
            backgroundSize: "contain",
            backgroundPosition:"center",
            backgroundRepeat: 'no-repeat'
          }}
        />
        <Link to={newTo} style={Username}>
          {username}
        </Link>
        <div style={ageTown}>
          <div style={userAge}>{age} ans</div>
          <Link  id={this.props.id} to={{pathname:"/inbox", aboutProps:{username:this.props.userinfo.username}}} style={{ all: 'unset', height:30, cursor:'pointer', display: 'flex', alignItems: 'center', fontSize: '1.5em' }}>
              <Icon name="mail" />
          </Link>
          <div style={userTown}>{town}</div>
        </div>
      </div>
    );
  }
}

const profileCard = {
  width: "204px",
  height: "340px",
  backgroundColor: "#fff",
  margin: 15,
  padding:5,
  borderRadius: 5,
  boxShadow: `2px 2px 4px rgba(80, 80, 80, 0.6)`,
  border: `1px rgba(0, 0, 0, 0.249) solid`
};

const Username = {
  display: "flex",
  textAlign: "center",
  height: "50px",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 18,
  fontWeight: 1000
};

const ageTown = {
  display: "flex",
  height: "50px",
  alignItems:'center'
};

const userAge = {
  width: "30%",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center"
};

const userTown = {
  width: "70%",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center"
};

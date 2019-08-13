import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import PopularityScore from "./PopularityScore";
import Menu from "../components/Menu";
const axios = require('axios');

export default function MemberProfile(props) {

  const [users, setUsers] = useState([]);
  const id = props.match.params.memberId;

  function displayPhotos() {
    let photosJsx = [];
    if (users.photos) {
      users.photos.map((photo, i) => {
        return photosJsx.push(
          <div key={i}>
            <div style={profileCard}>
              <div
                style={{
                  height: "240px",
                  backgroundImage: `url(${photo})`,
                  backgroundSize: "cover"
                }}
              />
            </div>
          </div>
        );
      });
      return (photosJsx)
    }
  }
  
  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/${id}`, { withCredentials: true })
      .then(response =>{
        // let photos = response.data.map(photo => {
        //   return photo.image_path;
        // });
        // let result = response.data[0];
        // setUsers({
        //   age: result.age,
        //   email: result.email,
        //   town: result.town,
        //   username: result.username,
        //   biography: result.biography,
        //   // score: result.score,
        //   // photos
        // });
        setUsers(response.data[0])
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id])

  return (
    <div>
      <Menu/>
      <div style={loginFormContainer}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={usernameStyle}>{users.username}</div>
          <PopularityScore id={id} score={users.score} />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={ageTown}>{users.age} ans </div>
          <div>&nbsp;-&nbsp;</div>
          <div style={ageTown}>{users.town}</div>
        </div>
        <div style={imgWrapper}>
          {displayPhotos()}
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={descriptionStyle}>
            <Icon name="quote left" />
            &nbsp;{users.biography}&nbsp;
            <Icon name="quote right" />
          </div>
        </div>
      </div>
    </div>
  );
}

const loginFormContainer = {
  flexDirection: "column",
  display: "flex",
  width: "50%",
  margin: "auto",
  marginTop: "100px",
  marginBottom: "50px"
};

const usernameStyle = {
  fontSize: 32,
  marginBottom: 20
};

const ageTown = {
  fontSize: 18,
  marginBottom: 20
};

const descriptionStyle = {
  fontSize: 16,
  marginTop: '1rem',
  marginBottom: '1rem'
};

const imgWrapper = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap'
}

const profileCard = {
  width: "204px",
  height: "240px",
  marginRight: 15,
  marginBottom: '1rem',
  borderRadius: 5,
  boxShadow: `2px 2px 1px rgba(80, 80, 80, 0.6)`,
};
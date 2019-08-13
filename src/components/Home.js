import React, { useState, useEffect } from 'react';
import ProfileCard from "./ProfileCard";
import "./home.scss";
import Menu from "./Menu";
const axios = require('axios');

export default function Home() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/users', { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);//?


  return (
    <div>
      <Menu />
      <div className="discoverContainer">
        {users.map((user, id) => <ProfileCard key={id} userinfo={user} />)}
      </div>
    </div>
  )
}

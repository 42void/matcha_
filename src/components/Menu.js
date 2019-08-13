import React, { Component } from "react";
import { Link } from "react-router-dom";

//media queries ==> a moins de 1024px on garde seulement panneau de droite
export default class Menu extends Component {
  render() {
    return (
      <div style={menuContainer}>
        <div style={leftContainer}>
          <Link to='/home' style={logo}>MATCHA</Link>
          <Link to='/home' style={link}>Découvrir</Link>
          <Link to='/search' style={link}>Recherche</Link>
        </div>
        <div style={rightContainer}>
          <Link to='/visits' style={link}>Visites</Link>
          <Link to='/winks' style={link}>Flash</Link>
          <Link to='/inbox' style={link}>Messages</Link>
          <Link to='/myprofile' style={link}>Mon profil</Link>
          <Link to='/' style={link}>Déconnection</Link>
        </div>
      </div>
    );
  }
}

const menuContainer = {
    backgroundColor:'#EEF0F5',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    flexWrap:'wrap',
    // position:'fixed',
    // width:'100%',
    // top:'0'
}
const leftContainer = {
    display:'flex',
    flexDirection:'row',
}
const rightContainer = {
    display:'flex',
    flexDirection:'row',
}
const logo = {
    fontFamily: "Lato",
    fontSize: 20,
    margin : '1em',
    display:'flex',
    alignItems:'center'

}
const link = {
    margin : '1em',
    display:'flex',
    alignItems:'center'
}
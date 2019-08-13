import React, { Component } from "react";
import {
  Button,
  Icon,
  Transition,
} from "semantic-ui-react";
// import Background from "../assets/img/2.jpg";
import { Redirect } from "react-router-dom";
// import MyProfilePhoto from "./MyProfilePhoto";
import FileButton from "./FileButton";
import ModifyUsername from "../components/modifyInfos/modifyUsername";
import ModifyName from "../components/modifyInfos/modifyName";
import ModifyFirstname from "../components/modifyInfos/modifyFirstname";
import ModifyCity from "../components/modifyInfos/modifyCity";
import ModifyBirthdate from "./modifyInfos/modifyBirthdate";
import ModifyGender from "./modifyInfos/modifyGender";
import ModifySexualOrientation from "./modifyInfos/modifySexualOrientation";
import ModifyEmail from "./modifyInfos/modifyEmail";
import ModifyPassword from "./modifyInfos/modifyPassword";
import ModifyDescription from "./modifyInfos/modifyDescription";
import Menu from "../components/Menu";
const axios = require('axios');

const tags = [
  "Voyage",
  "Salle de musculation",
  "Documentaires",
  "Informatique/Internet",
  "Jardinage",
  "World music",
  "Restaurant",
  "Bowling",
  "Mangas",
  "Trip-hop",
  "Sports extrêmes",
  "Photo",
  "Pilates",
  "Rugby",
  "Loisirs créatifs",
  "Gym",
  "Activités caritatives",
  "Blues",
  "Rock",
  "Gospel",
  "Théâtre",
  "Animaux"
];

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      inscriptionHover: false,
      connectionHover: false,
      forgotPwdHover: false,
      redirect: false,
      errorMsg: "",
      visible: "",
      open: false,
      user: '',
      selectedTags: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/getUserInfos`, { withCredentials: true })
      .then((res) => {
        this.setState({ selectedTags: res.data[0] ? res.data[0].tags!== null ? JSON.parse(res.data[0].tags) : [] : [] })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleVisibility = () => this.setState({ visible: true });

  toggleInscriptionHover = () => {
    this.setState({ inscriptionHover: !this.state.inscriptionHover });
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  displaysTags = () => {
    return tags.map((tag, i) => (
      <Button onClick={() => this.toggleTag(i)} key={i} id={"tag" + i}
        style={{
          backgroundColor: this.state.selectedTags ? this.state.selectedTags.indexOf(tag) >= 0 ? "#16ab39" : "#c2c2c2" : null,
          margin: 5,
          color: 'white'
        }}>
        {tag}
      </Button>
    ));
  };

  toggleTag = index => {
    let { selectedTags } = this.state
    this.setState({ visible: false });
    var found = selectedTags.find(function (element) {
      return element === document.getElementById("tag" + index).innerText;
    });
    if (found !== undefined) {
      for (var i = selectedTags.length - 1; i >= 0; i--) {
        if (selectedTags[i] === found) {
          selectedTags.splice(i, 1);
          document.getElementById("tag" + index).className = "ui toggle button";
        }
      }
    } else {
      selectedTags.push(document.getElementById("tag" + index).innerText);
      document.getElementById("tag" + index).className = "ui toggle button active";
    }
    console.log("selectedTags", selectedTags);
  };

  close = () => this.setState({ open: false });

  render() {
    const { redirect, selectedTags } = this.state;
    if (redirect) {
      return <Redirect to="/home/" />;
    }

    const button = {
      color: "white",
      // backgroundColor: this.state.connectionHover ? "#5D0101" : "#400000",
      margin: "5px 0px 0px 5px"
    };

    return (
      <div>
        <Menu />
        <div style={pageContainer2}>
          <h3 style={tagLine}>Mon profil</h3>
          <div style={loginFormContainer}>
            <ModifyUsername />
            <ModifyName />
            <ModifyFirstname />
            <ModifyBirthdate />
            <ModifyGender />
            <ModifySexualOrientation />
            <ModifyCity />
            <ModifyEmail />
            <ModifyPassword />
            {/* <button>
                  Mot de passe oublié ?(link)(qui envoie un email directement et
                  un toast sur lecran pour le dire)
                </button> */}

            <h3>Photos</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {/* <MyProfilePhoto />
              <MyProfilePhoto />
              <MyProfilePhoto />
              <MyProfilePhoto />
              <MyProfilePhoto /> */}
              <FileButton id={0}/>
              <FileButton id={1}/>
              <FileButton id={2}/>
              <FileButton id={3}/>
              <FileButton id={4}/>

            </div>

            <ModifyDescription />

            <h3>Ce que j'aime</h3>

            <div style={tagsContainer}>{this.displaysTags()}</div>
            <div style={buttonsContainer}>
              <Transition.Group animation={"vertical flip"} duration={500}>
                {this.state.visible && (
                  //  <Icon loading size="mini" name="circle notch" />
                  <Icon color="green" size="large" name="check" />
                )}
              </Transition.Group>
              <Button
                onClick={() => {
                  this.handleVisibility()
                  axios('http://localhost:4000/modifyTags', {
                  method: "post",
                  data: selectedTags,
                  withCredentials: true
                })
                  .then((response) => {
                    if (response.status === 200) {
                      this.setState({ open: false })
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                }}
                id="register"
                className="register"
                style={button}
                color="brown"
              >Enregistrer</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const buttonsContainer = {
  justifyContent: "center",
  display: "flex",
  alignSelf: "flex-end",
  alignItems: "center"
};

const tagsContainer = {
  width: "80%",
  margin: "auto",
};



const tagLine = {
  marginTop: "4rem",
  marginBottom: "2rem",
  textAlign: "center",
  fontFamily: "Caveat",
  fontSize: 36
};

const loginFormContainer = {
  flexDirection: "column",
  display: "flex",
  width: "50%",
  //   maxWidth: 300,
  margin: "auto",
  marginTop: "100px",
  marginBottom: "50px"
};

const pageContainer2 = {
  //   height: "100%",
  //   position: "fixed",
  //   width: "100%"
  //   backgroundImage: `url(${Background})`,
  //   backgroundSize: "cover"
};

export default MyProfile;

import * as React from "react";
import { Component } from "react";
import { Button, Icon } from "semantic-ui-react";
import * as uuid from "uuid";
const axios = require('axios');

export class FileButton extends Component {
  constructor(props) {
    super(props);
    this.id = uuid.v1();
    this.state = {
      data: "",
      fileName: "",
      btnSwitch:true,
      disabled:true,
      path:"",
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/getPhotosPaths`, { withCredentials: true })
      .then((res) => {
        this.setState({paths:res.data})
      })
      .then(() => {
        let {id} = this.props
        let {paths} = this.state
        if (paths[id]) { 
          this.setState({btnSwitch:false})
          this.setState({path:paths[id].image_path})
          var img = new Image(200,200);
          img.src = "http://localhost:4000/"+paths[id].image_path
          document.getElementsByClassName("imgContainer")[id].append(img)
          document.getElementsByClassName("plusIcon")[id].style.display = `none`
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onCancel = (e) => {
    e.preventDefault()
    this.setState({btnSwitch:!this.state.btnSwitch, disabled:true})
    document.getElementsByClassName("addPhotoButton")[this.props.id].style.background = `#e0e1e2 `
    document.getElementsByClassName("plusIcon")[this.props.id].style.display = `initial`
    document.getElementsByClassName("imgContainer")[this.props.id].removeChild(document.getElementsByClassName("imgContainer")[this.props.id].firstChild)
    axios("http://localhost:4000/removePhoto", {
      method: "post",
      data: this.state.path,
      withCredentials: true,
    })
    .then((response) => {
      console.log("response image removed", response)
    }).catch((error) => {
      console.log(error);
    });
  }

  onFormSubmit = (e, id) => {
    e.preventDefault();
    // document.getElementsByClassName("registerBtn")[id].style.background = "green"
    this.setState({btnSwitch:!this.state.btnSwitch})
    var file = this.state.file
    e.preventDefault();
    var data = new FormData();
    data.append('myImage', file);
    for (var key of data.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }

    axios("http://localhost:4000/uploadPhoto", {
      method: "post",
      data: data,
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log("response image uploaded", response)
        this.setState({path: response.data.path})
      }).catch((error) => {
        console.log(error);
      });
  }


  //penser a bloquer les mauvais formats
  onChangeFile = (e,id) => {
    const files = e.target.files;
    this.setState({ fileName: files[0].name, file: e.target.files[0], disabled:false });
    let reader = new FileReader();
    reader.readAsDataURL(files["0"]);
    reader.onload = e => {
      console.log("reader onload", e.target.result);
      this.setState({ data: e.target.result });
      var img = document.createElement("img");
      img.src = e.target.result
      document.getElementsByClassName("addPhotoButton")[this.props.id].style.background = `url(${img.src}) no-repeat`;
      document.getElementsByClassName("addPhotoButton")[this.props.id].style.backgroundSize = `contain`
      document.getElementsByClassName("plusIcon")[this.props.id].style.display = `none`
    }
  };

  render() {
    console.log("STATE",this.state)
    return (
      <div>
      <form encType="multipart/form-data" onSubmit={(e)=>{this.state.btnSwitch ? this.onFormSubmit(e, this.props.id) : this.onCancel(e)}}>
        <Button
          style={{
            width: 204,
            height: 240,
            borderRadius: 2,
            marginTop: 15,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          {...this.props}
          as="label"
          htmlFor={this.id}
          className="addPhotoButton"
        >
        
        {/* <img alt="imgContainer" id="imgContainer" src={require("../myImage-1563629229262.jpg")}/> */}
        <div className="imgContainer"/>

          <Icon className="plusIcon" name="plus" />
        </Button>
        <input
          hidden
          id={this.id}
          multiple
          type="file"
          onChange={(e)=>this.onChangeFile(e,this.props.id)}
        />
        <div style={{width:"90%"}}>
          {this.state.btnSwitch?<Button style={button} disabled={this.state.disabled} id={this.props.id} className="registerBtn" size="small">Enregistrer</Button>:<Button style={cancelBtn} size="small">Supprimer</Button>}
        </div>
      </form>
      </div>
    );
  }
}

const button = {
  // color: "white",
  // backgroundColor: this.state.connectionHover ? "#5D0101" : "#400000",
  margin: "5px 0px 0px 5px",
  width:'100%'
};

const cancelBtn = {
  margin: "5px 0px 0px 5px",
  width:'100%',
  backgroundColor:'#ff5252'
}

export default FileButton;

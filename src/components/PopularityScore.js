import React, { Component } from "react";
import { Icon, Button } from "semantic-ui-react";
const axios = require('axios');


// const votePopularityScore = gql`
//   mutation($id: Int!) {
//     votePopulatiryScore(id: $id) {
//       popularity_score
//     }
//   }
// `;

export default class PopularityScore extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { id } = this.props
    let liked = (this.state.liking === undefined) ? this.props.liking : this.state.liking;
    let score = (this.state.score === undefined) ? this.props.score : this.state.score;
    return (
      // <Mutation mutation={votePopularityScore}>
      //   {mutate => (
          <div style={popularityStyle}>
            <Button
              style={popularityButton}
              onClick={() => {
                axios.post(`http://localhost:4000/toggleLike/${id}`, {}, {withCredentials: true})
                  .then((res) => {
                    if(res.data) {
                      this.setState({liking:res.data.liking, score:res.data.score})
                    }
                  })
              }}
              // onClick={async () => {
              //   const response = await mutate({
              //     variables: {
              //       id
              //     }
              //   });
              //   console.log("PopularityScore server response", response)
              // }}
            >
              <div style={popularityButtonNumber}>{score}</div>
              <div><Icon name="like" color={liked ? 'red' : null}/></div>
            </Button>
          </div>
      //   )}
      // </Mutation>
    );
  }
}

const popularityStyle = {
  marginLeft: 30,
  marginTop: -5,
  fontSize: 15
};

const popularityButton = {
  display: 'flex',
  justifyContent: 'space-around',
  padding: '10px'
}

const popularityButtonNumber = {
  paddingLeft : '5px',
  paddingRight : '5px'

}
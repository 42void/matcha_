import React, { Component } from "react";
import { Icon, Button } from "semantic-ui-react";
 

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
    this.state = {};
  }
  render() {
      // const { id } = this.props
    return (
      // <Mutation mutation={votePopularityScore}>
      //   {mutate => (
          <div style={popularityStyle}>
            <Button
              style={popularityButton}
              // onClick={async () => {
              //   const response = await mutate({
              //     variables: {
              //       id
              //     }
              //   });
              //   console.log("PopularityScore server response", response)
              // }}
            >
              <div style={popularityButtonNumber}>{this.props.score}</div>
              <div><Icon name="like" /></div>
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
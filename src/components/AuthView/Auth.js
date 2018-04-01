
import React, { Component } from "react";
import { authenticated } from '../../ducks/reducer';
import { connect } from "react-redux";

import baseURL from '../../baseURL';
import api from "../../api";

class Auth extends Component {
  componentDidMount() {
    const { authenticated, user, history } = this.props;
    if ( user === null ) {
      authenticated( history, '/' );
    } else if ( user !== null ) {
      history.push('/');
    }
  }

  render() {
    return (
      <div>
        <a href={ `${baseURL}${api.login}` }>Login/Register</a>
      </div>
    )
  }
}

export default connect( state => state, { authenticated } )( Login );



// import React, { Component } from 'react';


// class Auth extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             user: {}
//         }
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     }

//     handleChange(event) {
//         this.setState({user: this.state.user})
//     }

//     handleSubmit(event) {
//         console.log(this.state.user);
//         event.preventDefault();
//     }


//     render() {
//         return (
//             <form value="submit" onSubmit={this.handleSubmit}>
//                 <label>
//                     {/* <img src="" /> */}
//                     <h2>Helo</h2>
//                     <button type="text" value="login">Login/Register</button>
//                 </label>
//             </form>
//         )
//     }

// }

// export default Auth;
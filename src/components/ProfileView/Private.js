import React, { Component } from 'react';
// import './Private.css'
// import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from './../../ducks/reducer';
import { Link } from 'react-router-dom';


class Private extends Component {


    componentDidMount() {
    this.props.getUser();
    }


    render() {
        let { userData } =  this.props
        return (
            <div>
               <Link to="/profile">Profile</Link>
                <h3>Account Holder: { userData.user_name ? userData.user_name : null}</h3>
                {
                    userData.img ?
                    <img className='avatar' src={ userData.img } /> : null
                }
                <h3>Account Profile: { userData.auth_id ? userData.auth_id : null } </h3>

                <a href='http://localhost:3009/logout'>
                    <button>Logout</button>
                </a>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userData: state.user
    }
}

export default connect(mapStateToProps, { getUser })(Private);
import React from "react";
import { Link } from "react-router-dom";


export default function User( { logout, history, user } ) {
  console.log( user );
  return (
    <div className="User__container">
      <div className="User__left">
        <img className="User__image" src={ user ? user.picture : '#' } alt="user" />
      </div>

      <div className="User__right">
        <span className="User__first_name open-sans-bold">{ user ? user.first : null }</span>
        <span className="User__last_name open-sans-bold">{ user ? user.last : null }</span>
        <Link to="/profile">
          <button className="User__btn_edit grey-btn open-sans">Edit Profile</button>
        </Link>
      </div>
    </div>
  )
}

//correct

import React from "react";
import { Link } from "react-router-dom";

export default function User( { logout, history, user } ) {
  return (
    <div>
      <Link to="/profile">
        <div>
          {
            user
            ?
              <span>User Icon Here | { user.first } { user.last }</span>
            :
              null
          }
        </div>
      </Link>

      <div onClick={ () => logout( history ) }>
        Logout
      </div>
    </div>
  )
}

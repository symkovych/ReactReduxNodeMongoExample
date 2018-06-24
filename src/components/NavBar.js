import React from 'react';
import { NavLink } from 'react-router-dom';

export default function (props) {
    const usersTab = <li> <NavLink to = "/users"> Users </NavLink></li>;
  return (
        <nav>
            <ul>
                <li><NavLink to="/">Posts</NavLink></li>
                <li><NavLink to="/addPost">Add Posts</NavLink></li>
                <li><NavLink to="/myProfile">My Profile</NavLink></li>
                {props.currentUser.isAdmin && usersTab}
                <li><NavLink to="/signIn" onClick = {props.logOut}>Log out</NavLink></li>
            </ul>
        </nav>
  );
}

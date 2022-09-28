import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"
import { useLocation } from 'react-router-dom';
import { Menu } from "semantic-ui-react"

function NavBar() {

    const navigate = useNavigate();
    let location = useLocation();
    const [activeItem, setActiveItem] = useState("Home")
    const { user } = useContext(AuthContext);

    return (
        <Menu className="nav">
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={() => setActiveItem("Home")}>
                <Link to="/"> Home </Link>
            </Menu.Item>

            <Menu.Item
                name='completed'
                active={activeItem === 'completed'}
                onClick={() => setActiveItem("Completed")}>
                <Link to="/completed"> Completed </Link>
            </Menu.Item>

            <Menu.Item
                name='create'
                active={activeItem === 'create'}
                onClick={() => setActiveItem("Create")}>
                <Link to="/create"> Create </Link>
            </Menu.Item>

            <Menu.Item
                name='leaders'
                active={activeItem === 'leaders'}
                onClick={() => setActiveItem("Leaders")}>
                <Link to="/leaders"> Leaders </Link>
            </Menu.Item>

            <Menu.Item
                name='profile'
                active={activeItem === 'profile'}
                onClick={() => setActiveItem("Profile")}>
                <Link to="/profile"> Profile </Link>
            </Menu.Item>
            {user ? (<Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={() => setActiveItem("Login")}>
                <Link to="/login"> Login </Link>
            </Menu.Item>) : null }
        </Menu>
    )
}

export default NavBar
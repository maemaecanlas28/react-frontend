import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"
import { useLocation } from 'react-router-dom';
import { Menu } from "semantic-ui-react"

function NavBar() {

    const navigate = useNavigate();
    let location = useLocation();
    const [activeItem, setActiveItem] = useState("Home")
    const auth = useContext(AuthContext);

    return (
        <Menu className="nav" inverted>
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

            {auth.user ?
                (<Menu.Item
                    name='profile'
                    active={activeItem === 'profile'}
                    onClick={() => setActiveItem("Profile")}
                    position="right">
                    <Link to={`/profile/${auth.user.id}`}> Profile </Link>
                </Menu.Item>) :
                (<Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={() => setActiveItem("Login")}
                    position="right">
                    <Link to="/login"> Login </Link>
                </Menu.Item>)}
        </Menu>
    )
}

export default NavBar
import React, { useContext, useState, useEffect } from "react";
import { Image, Header, Button, Item, Form, TextArea, Input, Modal, Icon, Menu, Segment } from "semantic-ui-react"
import { AuthContext } from "../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom"
import UserList from "./UserList"
import ProfileBoardList from "./ProfileBoardList"

function Profile() {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [bio, setBio] = useState("");
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false)
    const [activeItem, setActiveItem] = useState("Created")
    const params = useParams();

    // grabbing user data for the profile page
    useEffect(() => {
        if (auth.user?.id === parseInt(params.id)) {
            setUser(auth.user)
        }
        else {
            fetch(`/api/users/${params.id}`)
                .then(data => data.json())
                .then(data => {
                    setUser(data)
                })
        }
    }, [params.id])

    const addBio = (e) => {
        e.preventDefault()
        const patchReqObj = {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Accepts": "application/json",
            },
            body: JSON.stringify({
                "bio": bio,
            })
        }
        fetch(`/api/users/${user.id}`, patchReqObj)
            .then((res) => res.json())
            .then((data) => {
                setUser(data)
                setOpen(!open)
                auth.setUser(data)
            })
    }

    function handleFollow(e) {
        e.preventDefault()
        const postReqObj = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accepts": "application/json",
            },
            body: JSON.stringify({
                "user_id": user.id,
            })
        }
        fetch("/api/follow", postReqObj)
            .then(data => data.json())
            .then(data => {
                const userCopy = JSON.parse(JSON.stringify(auth.user))
                userCopy.followings.push(data)
                auth.setUser(userCopy)
            })
    }

    function handleUnfollow(e) {
        e.preventDefault()
        const deleteReqObj = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Accepts": "application/json",
            },
            body: JSON.stringify({
                "user_id": user.id,
            })
        }
        fetch("/api/unfollow", deleteReqObj)
            .then(() => {
                const userCopy = JSON.parse(JSON.stringify(auth.user))
                userCopy.followings = userCopy.followings.filter(data => {
                    return user.id !== data.user_id
                })
                auth.setUser(userCopy)
            })
    }

    function handleLogout() {
        auth.signout().then(() => navigate("/"))
    }

    function showFollow() {
        const followings = auth.user?.followings
        const result = followings?.find(item => item.user_id === user.id)
        return result == null
    }

    function showTabContent() {
        switch (activeItem) {
            case "Created":
                return (<ProfileBoardList user={user} tab="created" />)
            case "Ranked":
                return (<ProfileBoardList user={user} tab="ranked" />)
            case "Followers":
                return (<UserList users={user.followers} />)
            case "Following":
                return (<UserList users={user.followings} />)
        }
    }

    return (
        <div>
            {auth.user?.id === user.id ?
                (<Header
                    className="profile-form"
                    as='h2'
                    icon>
                    <Icon
                        name='user circle' />
                    My Profile
                </Header>) : null}
            <div className="image-profile">
                {auth.user?.id === user.id ?
                    (<Button
                        secondary
                        onClick={handleLogout}
                        className="logout-button">
                        Logout
                    </Button>) : null}
                <Header
                    className="header-padding"
                    as="h1"
                    textAlign="center">
                    {user.username}
                </Header>
                <Image
                    className="border-image"
                    src={`https://storage.googleapis.com/ranktogether-images/${user.avatar}`} size='medium' circular centered />
                <Item.Description>
                    <Header
                        className="header-padding"
                        as="h2"
                        textAlign="center">
                        {user.bio}
                    </Header>
                </Item.Description>
                {auth.user?.id === user.id ?
                    (<Modal
                        closeIcon
                        open={open}
                        trigger={<Button
                            secondary
                            className="button-center">
                            About Me
                        </Button>}
                        onClose={() => setOpen(!open)}
                        onOpen={() => setOpen(!open)}
                        centered>
                        <Header icon="pencil alternate" content='About Me' />
                        <Form onSubmit={addBio}>
                            <TextArea
                                type="text"
                                name="bio"
                                placeholder="Tell us about yourself"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)} />
                            <Input type="submit" className="button-margin" />
                        </Form>
                    </Modal>) : null}
                <>{auth.user?.id === user?.id ? null
                    : (<div>
                        {showFollow() ?
                            (<Button
                                className="button-center"
                                positive
                                onClick={handleFollow}>
                                👉 Follow
                            </Button>)
                            :
                            (<Button
                                className="button-center"
                                negative
                                onClick={handleUnfollow}>
                                Unfollow
                            </Button>)}
                    </div>)} </>
                <div className="profile-navbar">
                    <Menu 
                        pointing 
                        secondary>
                        <Menu.Item
                            name='Created'
                            active={activeItem === 'Created'}
                            onClick={() => setActiveItem("Created")} />
                        <Menu.Item
                            name='Ranked'
                            active={activeItem === 'Ranked'}
                            onClick={() => setActiveItem("Ranked")} />
                        <Menu.Item
                            name='Followers'
                            active={activeItem === 'Followers'}
                            onClick={() => setActiveItem("Followers")} />
                        <Menu.Item
                            name='Following'
                            active={activeItem === 'Following'}
                            onClick={() => setActiveItem("Following")} />
                    </Menu>

                    <Segment>
                        {showTabContent()}
                    </Segment>
                </div>
            </div>
        </div>
    )
}

export default Profile
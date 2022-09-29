import React, { useContext, useState, useEffect } from "react";
import { Image, Header, Button, Item, Form, TextArea, Input, Modal } from "semantic-ui-react"
import { AuthContext } from "../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom"

function Profile() {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [isBioClicked, setIsBioClicked] = useState(false);
    const [bio, setBio] = useState("");
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false)

    const params = useParams();

    // grabbing user date for the profile page
    useEffect(() => {
        if (auth.user?.id === parseInt(params.id)) {
            setUser(auth.user)
        }
        else {
            fetch(`/users/${params.id}`)
                .then(data => data.json())
                .then(data => {
                    setUser(data)
                })
        }
    }, [])

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
        fetch(`/users/${user.id}`, patchReqObj)
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
        fetch("/follow", postReqObj)
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
        fetch("/unfollow", deleteReqObj)
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

    return (
        <div className="image-profile">
            <Header size='huge' textAlign="center">{user.username}</Header>
            {/* <Item.Meta>
                <Header
                    onClick={() => setIsBioClicked(!isBioClicked)}
                    as='h3'
                    textAlign="center">
                    Bio:
                </Header>
            </Item.Meta> */}
            <Item.Description>
                {user.bio}
            </Item.Description>
            {auth.user?.id === user.id ?
                (<Modal
                    closeIcon
                    open={open}
                    trigger={<Button align="center">Bio</Button>}
                    onClose={() => setOpen(!open)}
                    onOpen={() => setOpen(!open)}>
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
                            positive
                            onClick={handleFollow}>
                            👉 Follow
                        </Button>)
                        :
                        (<Button
                            negative
                            onClick={handleUnfollow}>
                            Unfollow
                        </Button>)}
                </div>)} </>
            <Image
                className="border-image"
                src={`https://storage.googleapis.com/ranktogether-images/${user.avatar}`} size='medium' />
            <Button onClick={handleLogout}>
                Logout
            </Button>
        </div>
    )
}

export default Profile
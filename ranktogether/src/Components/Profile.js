import React, { useContext } from "react";
import { Image, Header, Button } from "semantic-ui-react"
import { AuthContext } from "../Context/AuthContext";

function Profile({ user }) {

    const auth = useContext(AuthContext);

    return (
        <div className="image-profile">
            <Header size='huge' textAlign="center">{auth.user.username}</Header>
            <>{auth.user ? null
                : (<div>
                    <Button positive> 👉 Follow </Button>
                    <Button negative> Unfollow </Button>
                </div>)} </>
            <Image
                className="border-image"
                src={`https://storage.googleapis.com/ranktogether-images/${auth.user.avatar}`} size='medium' />
        </div>
    )
}

export default Profile
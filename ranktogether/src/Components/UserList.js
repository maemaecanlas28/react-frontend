import React from "react";
import { List, Header, Image } from "semantic-ui-react"
import { useNavigate } from "react-router-dom"


function UserList({ users }) {

    const navigate = useNavigate();

    function handleClickProfile(userID) {
        navigate(`/profile/${userID}`)
    }

    const listOfFollowers = users.map(user => {
        return (
            <>
            <List key={user.user_id}>
                <List.Item>
                    <Header 
                        className="followers-header"
                        as='h3'
                        onClick={() => handleClickProfile(user.user_id)}>
                        <Image
                            circular
                            src={`https://storage.googleapis.com/ranktogether-images/${user.avatar}`} />
                        {user.username}
                    </Header>
                </List.Item>
            </List>
            </>
        )
    })
    return (
        <div className="followers-list">
            {listOfFollowers}
        </div>
    )
}

export default UserList
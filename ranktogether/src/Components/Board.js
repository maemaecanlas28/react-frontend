import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, Image, Button } from "semantic-ui-react"

function Board({ board }) {

    let navigate = useNavigate()

    function handleClickCreator(userID) {
        navigate(`/profile/${userID}`)
      }

    return (
        <Card className="card-board-scroll">
            <Image src={`https://storage.googleapis.com/ranktogether-images/${board.options[0].option_image}`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{board.title}</Card.Header>
                <Card.Meta>
                    <Button onClick={() => handleClickCreator(board.user.id)}>
                        <span className='username'>{board.user.username}</span>
                    </Button>
                </Card.Meta>
                <Card.Description>
                    {board.end_date}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default Board
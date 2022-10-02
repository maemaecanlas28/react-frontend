import React from "react"
import { useNavigate } from "react-router-dom"
import { Card, Button } from "semantic-ui-react"

function Board({ board }) {

    let navigate = useNavigate()

    function handleClickCreator(userID) {
        navigate(`/profile/${userID}`)
    }

    function handleClickBoard(boardID) {
        navigate(`/board/${boardID}`)
    }

    const endDate = new Date(board.end_date)
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = endDate.toLocaleDateString('en-US', options)

    return (
        <Card className="card-board-scroll">
            <img
                className="card-size-homepage"
                onClick={() => handleClickBoard(board.id)}
                src={`https://storage.googleapis.com/ranktogether-images/${board.options[0].option_image}`}
                wrapped ui={false} />
            <Card.Content>
                <Card.Header>{board.title}</Card.Header>
                <Card.Meta>
                    <Button
                        secondary
                        onClick={() => handleClickCreator(board.user.id)}>
                        <span
                            className='username'>
                            {board.user.username}
                        </span>
                    </Button>
                </Card.Meta>
                <Card.Description>
                    End Date: {formattedDate}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default Board
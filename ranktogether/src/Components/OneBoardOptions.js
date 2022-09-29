import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Header, Grid, Image, Card, Dimmer, Loader } from "semantic-ui-react"

function OneBoardOptions() {

    const params = useParams();
    const boardID = parseInt(params.id)
    const [board, setBoard] = useState(null)

    useEffect(() => {
        fetch(`/boards/${boardID}`)
            .then(data => data.json())
            .then(data => setBoard(data))
    }, [])

    function calculateColumns() {
        const boardLength = board.options.length
        if (boardLength === 2 || boardLength === 4) {
            return 2
        }
        return 3
    }

    function getGridClass() {
        const boardLength = board.options.length
        if (boardLength === 2 || boardLength === 4) {
            return "grid-margin grid-width-30"
        }
        return "grid-margin grid-width-50"
    }

    const optionsCards = board?.options
        .map((option, idx) => {
            return (
                <Grid.Column key={option.id}>
                    <Card centered className="card-margin">
                        <div className="card-img-container">
                            <img
                                className="card-img"
                                src={`https://storage.googleapis.com/ranktogether-images/${option.option_image}`} />
                        </div>
                        <Card.Content>
                            <Card.Header>
                                <div className="board-option-name">
                                    {option.name}
                                </div>
                                <div className="board-option-number">
                                    <h4> {idx + 1} </h4>
                                </div>
                            </Card.Header>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            )
        })

    return (
        <div>
            {board === null ? (<Dimmer active>
                <Loader size='massive'>Loading</Loader>
            </Dimmer>) :
                (<>
                    <div className="header-board">
                        <Header as='h1'>{board.title}</Header>
                        <Header as='h2'>{board.description}</Header>
                        <Header as="h3">{board.user.username}</Header>
                    </div>
                    <Grid className={getGridClass()} centered={true}>
                        <Grid.Row columns={calculateColumns()}>
                            {optionsCards}
                        </Grid.Row>
                    </Grid></>)}
        </div>
    )
}

export default OneBoardOptions
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom"
import { Header, Grid, Button, Dimmer, Loader, Comment, Form } from "semantic-ui-react"
import OptionsCards from "./OptionsCard";
import update from 'immutability-helper'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Comments from "./Comments";


function OneBoardOptions() {

    const params = useParams();
    const boardID = parseInt(params.id)
    const [board, setBoard] = useState(null)
    const [options, setOptions] = useState([]);
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetch(`/boards/${boardID}`)
            .then(data => data.json())
            .then(data => {
                setBoard(data)
                setOptions(data.options)
                setComments(data.comments)
            })
    }, [])

    function calculateColumns() {
        const boardLength = options.length
        if (boardLength === 2 || boardLength === 4) {
            return 2
        }
        return 3
    }

    function getGridClass() {
        const boardLength = options.length
        if (boardLength === 2 || boardLength === 4) {
            return "grid-margin grid-width-30"
        }
        return "grid-margin grid-width-50"
    }

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setOptions((prevOptions) =>
            update(prevOptions, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevOptions[dragIndex]],
                ],
            }),
        )
    }, [])

    const optionsCards = options
        .map((option, idx) => {
            return (
                <OptionsCards key={option.id} option={option} idx={idx} moveCard={moveCard} />
            )
        })

    const commentsList = comments
        .map((comment, idx) => {
            return (
                <Comments key={comment.id} comment={comment} idx={idx}/>
            )
        })

    return (
        <DndProvider backend={HTML5Backend}>
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
            <Button
                size="huge"
                className="vote-button"
                secondary>
                Vote!
            </Button>
            <div>
                <Comment.Group>
                    <Header as='h3' dividing>
                        Comments!
                       {commentsList}
                    </Header>
                </Comment.Group>
                <Form reply>
                    <Form.TextArea />
                    <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                </Form>
            </div>
        </DndProvider>
    )
}

export default OneBoardOptions
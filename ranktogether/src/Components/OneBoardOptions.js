import React, { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useParams, useNavigate } from "react-router-dom"
import { Header, Grid, Button, Dimmer, Loader, Comment, Form } from "semantic-ui-react"
import OptionsCards from "./OptionsCard";
import update from 'immutability-helper'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Comments from "./Comments";


function OneBoardOptions() {

    const auth = useContext(AuthContext);
    const params = useParams();
    const boardID = parseInt(params.id)
    const [board, setBoard] = useState(null)
    const [options, setOptions] = useState([]);
    const [comments, setComments] = useState([])
    const [message, setMessage] = useState("")

    let navigate = useNavigate()

    function handleClickCreator(userID) {
        navigate(`/profile/${userID}`)
    }

    useEffect(() => {
        fetch(`/boards/${boardID}`)
            .then(data => data.json())
            .then(data => {
                setBoard(data)
                if (hasUserVoted()) {
                    data.options = data.options.sort((optionA, optionB) => {
                        return optionB.score - optionA.score
                    })
                }
                setOptions(data.options)
                setComments(data.comments)
            })
    }, [auth.user])

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

    const handleVote = (e) => {
        e.preventDefault()
        if (isUserLoggedOut()) {
            navigate("/login")
        }
        const voteIDs = options.map(option => option.id)
        const postReqObj = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accepts": "application/json",
            },
            body: JSON.stringify({
                "board_id": board.id,
                "rankings": voteIDs
            })
        }
        fetch("/votes", postReqObj)
            .then((res) => res.json())
            .then((data) => {
                auth.setUser(data.user)
            })
    }

    const handleNewComment = (e) => {
        e.preventDefault()
        if (isUserLoggedOut()) {
            navigate("/login")
        }
        const postReqObj = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accepts": "application/json",
            },
            body: JSON.stringify({
                "message": message,
                "board_id": board.id
            })
        }
        fetch("/comments", postReqObj)
            .then((res) => res.json())
            .then((data) => {
                setComments([...comments, data])
                setMessage("")
            })
    }

    function hasUserVoted() {
        const userVote = auth.user?.votes.find(vote => {
            return board?.id === vote.board_id
        })
        return userVote != null;
    }

    function getUserVote() {
        const userVote = auth.user?.votes.find(vote => {
            return board?.id === vote.board_id
        })
        return userVote;
    }

    function isUserLoggedOut() {
        return auth.user?.id == null
    }


    function removeComment(comment) {
        const deleteReqObj = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Accepts": "application/json",
            }
        }
        fetch(`/comments/${comment.id}`, deleteReqObj)
            .then(() => {
                const newList = [...comments]
                let listingIndex = 0
                for (let i = 0; i < newList.length; i++) {
                    const currListing = newList[i]
                    if (currListing.id === comment.id) {
                        listingIndex = i;
                        break;
                    }
                }
                newList.splice(listingIndex, 1)
                setComments(newList);
            })
    }

    const optionsCards = options
        .map((option, idx) => {
            return (
                <OptionsCards
                    key={option.id}
                    option={option}
                    idx={idx}
                    moveCard={moveCard}
                    userVote={getUserVote()} />
            )
        })

    const commentsList = comments
        .map((comment, idx) => {
            return (
                <Comments
                    key={comment.id}
                    comment={comment}
                    idx={idx}
                    removeComment={removeComment}
                    handleClickCreator={handleClickCreator} />
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
                            <Header as='h1'>
                                {board.title}
                            </Header>
                            <Header as='h2'>
                                {board.description}
                            </Header>
                            <Header
                                className="creator-click"
                                onClick={() => handleClickCreator(board.user.id)}
                                as="h3">
                                {board.user.username}
                            </Header>
                        </div>
                        <div>
                            {hasUserVoted() ?
                                (<Header
                                    className="total-votes"
                                    as="h2">
                                    Total Votes: {board.vote_count}
                                </Header>) : null}
                        </div>
                        <Grid className={getGridClass()} centered={true}>
                            <Grid.Row columns={calculateColumns()}>
                                {optionsCards}
                            </Grid.Row>
                        </Grid></>)}
            </div>
            <div className="vote-button">
                {!hasUserVoted() ?
                    (<Button
                        onClick={handleVote}
                        size="huge"
                        secondary>
                        {isUserLoggedOut() ? "Login to vote!" : "Vote!"}
                    </Button>) : null}
            </div>
            <div className="comments-section">
                <Comment.Group>
                    <Header as='h3' dividing>
                        Comments!
                        {commentsList}
                    </Header>
                </Comment.Group>
                <Form>
                    {isUserLoggedOut() ? null :
                        (<Form.TextArea
                            className="comment-box"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)} />)}
                    <Button
                        onClick={handleNewComment}
                        // className="add-comment-button"
                        content={isUserLoggedOut() ? "Login to comment" : 'Add Comment'}
                        labelPosition='left'
                        icon='edit'
                        floated="right"
                        secondary />
                </Form>
            </div>
        </DndProvider>
    )
}

export default OneBoardOptions
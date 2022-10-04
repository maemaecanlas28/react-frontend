import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import Board from "./Board";

function ProfileBoardList({ user, tab }) {

    const [boards, setBoards] = useState([])


    useEffect(() => {
        if (user != null) {
            const url = tab === "created" ? `/boards/user/${user.id}` : `/boards/ranked/${user.id}`
            fetch(url)
                .then(data => data.json())
                .then(data => {
                    setBoards(data)
                })
        }
    }, [user, tab])

    const createdBoards = boards.map(board => {
        return (
            <Board
                key={board.id}
                board={board} />
        )
    })

    return (
        <div>
            <Card.Group itemsPerRow={4}>
                {createdBoards}
            </Card.Group>

        </div>
    )
}

export default ProfileBoardList
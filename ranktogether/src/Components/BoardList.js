import React from "react";
import { Card } from "semantic-ui-react";
import Board from "./Board"


function BoardList({ boards, category }) {

    const boardCards = boards
        .filter(board => {
            return board.category === category
        })
        .map(board => {
            return (
                <Board
                    key={board.id}
                    board={board} />)
        })


    return (
        <>
            {boardCards}
        </>
    )

}

export default BoardList
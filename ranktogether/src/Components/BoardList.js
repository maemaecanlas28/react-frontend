import React from "react";
import Board from "./Board";


function BoardList({ boards, category }) {

    const boardCards = boards
        .filter(board => {
            return board.category === category
        })
        // bring back to board.id and remove idx
        .map((board, idx) => {
            return (
                <Board
                    key={idx}
                    board={board} />
        )
        })

    return (
        <>
            {boardCards}
        </>
    )

}

export default BoardList
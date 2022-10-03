import React from "react";
import Board from "./Board";


function BoardList({ boards, category, page }) {

    const boardCards = boards
        .filter(board => {
            return board.category === category
        })
        .filter(board => {
            const curDate = new Date().getTime();
            const endDate = new Date(board.end_date).getTime();
            if (page === "home") {
                return endDate >= curDate
            }
            return endDate < curDate
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
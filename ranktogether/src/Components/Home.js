import React from "react";
import BoardList from "./BoardList"
import { Card, Header } from "semantic-ui-react"

function Home({ boards }) {

    const categories = ["Animals", "eSports", "Movies"]

    const boardLists = categories
        .map(category => {
            return (
                <div key={category}>
                    <div className="header-margin">
                        <Header size='large'> {category} </Header>
                    </div>
                    <div className="board-margin">
                        <Card.Group className="board-scroll">
                            <BoardList category={category} boards={boards} />
                        </Card.Group>
                    </div>
                </div>
            )
        })


    return (
        <div>
            {boardLists}
        </div>
    )
}

export default Home
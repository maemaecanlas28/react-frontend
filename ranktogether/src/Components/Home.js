import React from "react";
import BoardList from "./BoardList"
import { Card, Header } from "semantic-ui-react"
import { CategoryTypes } from "../Types/CategoryTypes";

function Home({ boards }) {

    const categoryOptions = Object.keys(CategoryTypes).map(key => {
        return CategoryTypes[key]
    })

    const boardLists = categoryOptions
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        .map(category => {
            return (
                <div
                    key={category}>
                    <div className="header-margin">
                        <Header size='large'>
                            {category}
                        </Header>
                    </div>
                    <div className="board-margin">
                        <Card.Group
                            className="board-scroll">
                            <BoardList
                                category={category}
                                boards={boards} />
                        </Card.Group>
                    </div>
                </div>
            )
        })


    return (
        <div className="home">
            {boardLists}
        </div>
    )
}

export default Home
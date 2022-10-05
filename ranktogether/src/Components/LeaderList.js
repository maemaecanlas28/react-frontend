import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Dimmer, Loader, Header } from "semantic-ui-react"
import Ribbon from "../Images/Ribbon.png"

function LeaderList({ group }) {

    const [voters, setVoters] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();

    function handleClickUsername(userID) {
        navigate(`/profile/${userID}`)
    }

    useEffect(() => {
        const url = group === "rankers" ? "/api/votes/toprankers" : "/api/votes/topcreators"
        fetch(url)
            .then(data => data.json())
            .then(data => {
                setVoters(data)
                setIsLoading(false)
            })
    }, [])

    return (
        <>
            {isLoading ? (<Dimmer active>
                <Loader size='massive'>Loading</Loader>
            </Dimmer>) :

                (<div>
                    {voters.length >= 1 ? (<div className="top-rank-image">
                        <div
                            onClick={() => handleClickUsername(voters[0].user_id)}
                            className="ribbon-position">
                            <img
                                className="rank-image-size"
                                size='medium'
                                src={`https://storage.googleapis.com/ranktogether-images/${voters[0].avatar}`} />
                            <img
                                className="ribbon"
                                src={Ribbon} />

                            <div
                                className="header-topvoters">
                                <Header
                                    textAlign="center"
                                    as='h1'>
                                    #1: {voters[0].username}
                                </Header>
                            </div>
                        </div>
                    </div>) : null}

                    {voters.length >= 3 ?
                        (<div
                            className="rest-rank-image">
                            <div
                                className="pointer-cursor"
                                onClick={() => handleClickUsername(voters[1].user_id)}>
                                <img
                                    className="rank-image-size"
                                    src={`https://storage.googleapis.com/ranktogether-images/${voters[1].avatar}`} />
                                <div
                                    className="header-topvoters">
                                    <Header
                                        textAlign="center"
                                        as='h2'>
                                        #2: {voters[1].username}
                                    </Header>
                                </div>

                            </div>
                            <div
                                className="pointer-cursor"
                                onClick={() => handleClickUsername(voters[2].user_id)}>
                                <img
                                    className="rank-image-size"
                                    src={`https://storage.googleapis.com/ranktogether-images/${voters[2].avatar}`} />
                                <div
                                    className="header-topvoters">
                                    <Header
                                        textAlign="center"
                                        as='h2'>
                                        #3: {voters[2].username}
                                    </Header>
                                </div>
                            </div>
                        </div>) : null}
                </div>)}
        </>
    )
}

export default LeaderList
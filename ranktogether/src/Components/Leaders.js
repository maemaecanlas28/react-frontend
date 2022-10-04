import React from "react";
import { Segment, Divider } from "semantic-ui-react"
import LeaderList from "./LeaderList";
import TRBanner from "../Images/TRBanner.png"
import TCBanner from "../Images/TCBanner.png"

function Leaders() {

    return (
            <div>
                <img
                    src={TRBanner}
                    alt="TRBanner"
                    className="border-list" />
                <LeaderList group="rankers" />
                <Divider 
                    inverted
                    section />
                <img
                    src={TCBanner}
                    alt="TCBanner"
                    className="border-list" />
                <LeaderList group="creators" />
            </div>
    )
}

export default Leaders
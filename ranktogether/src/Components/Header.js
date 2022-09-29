import React from "react";
import RankTogether from "../Images/RankTogether.png"

function Header() {
    return (
        <div className="background-purple">
            <img
                src={RankTogether}
                alt="RankTogether GIF"
                id="main-header" />
        </div>
    )
}

export default Header
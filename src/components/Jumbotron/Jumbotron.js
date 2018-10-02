import React from "react";
import "./Jumbotron.css";

const Jumbotron = props => (
    <div className="jumbotron text-center">
        {/* <h1>Clicky Game</h1> */}
        <h1>{props.message}</h1>
    </div>
)

export default Jumbotron;
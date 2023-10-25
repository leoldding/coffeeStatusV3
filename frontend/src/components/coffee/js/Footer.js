import React from "react";
import { Link } from "react-router-dom";

function CoffeeFooter(props) {

    return (
        <div className={"absolute bottom-0 w-full h-[36px] bg-[#9C6F44] flex flex-col justify-center items-end text-coffeeWhite-1 px-4"}>
            <div>
                <Link to={props.link}>{props.text}</Link>
            </div>
        </div>
    )
}

export default CoffeeFooter;

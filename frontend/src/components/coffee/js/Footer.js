import React from "react";
import { Link } from "react-router-dom";

function CoffeeFooter() {

    return (
        <div className={"relative bottom-0 w-full h-[36px] bg-[#9C6F44] flex flex-row justify-end items-center space-x-2 text-coffeeWhite-1 px-4"}>
            <Link to={"/"}>Home</Link>
            <div>|</div>
            <Link to={"/admin"}>Admin</Link>
        </div>
    )
}

export default CoffeeFooter;

import React from "react";

const PokemonNickname = (props) => {
    return (
        <div className={props.containerClass}>
            <p className={props.pClass} style={props.pStyle}>{props.name}</p>
        </div>
    );
}

export default PokemonNickname;

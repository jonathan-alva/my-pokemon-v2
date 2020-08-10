import React from "react";

const PokemonName = (props) => {
    return (
        <div className={props.containerClass}>
            <p className={props.pClass} style={props.pStyle}>{props.name}</p>
        </div>
    );
}

export default PokemonName;

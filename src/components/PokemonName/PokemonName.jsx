import React from "react";

const PokemonName = (props) => {
    return (
        <div data-testid="pokemon-name-div" className={props.containerClass}>
            <p data-testid="pokemon-name-text" className={props.pClass} style={props.pStyle}>{props.name}</p>
        </div>
    );
}

export default PokemonName;

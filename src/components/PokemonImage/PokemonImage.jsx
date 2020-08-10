import React from "react";

const PokemonImage = (props) => {
    return (
        <div className={props.containerClassName}>
            <img src={props.image} alt="Pokemon" className={props.imageClassName} width={props.width}/>
        </div>
    );
}

export default PokemonImage;

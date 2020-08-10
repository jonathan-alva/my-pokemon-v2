import React from "react";

const PokemonType = (props) => {
    return (
        <div className="pokemon-types">
            {props.type.map(res=>{
                return(
                    <span className={`pokemon-type -${res.type.name}`} key={res.slot}>
                        {res.type.name}
                    </span>
                );
            })}
        </div>
    );
}

export default PokemonType;
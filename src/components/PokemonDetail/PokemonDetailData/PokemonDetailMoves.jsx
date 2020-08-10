import React from 'react'
import startCase from "lodash/startCase";

const PokemonDetailMoves = (props) => {
    let moves = props.moves
    return(
        <div className="pokemon-move-box">
            {moves.map((move) => {
                return (
                <span className="pokemon-move" key={move}>
                    {startCase(move)}
                </span>
                );
            })}
        </div>
    )
}

export default PokemonDetailMoves;
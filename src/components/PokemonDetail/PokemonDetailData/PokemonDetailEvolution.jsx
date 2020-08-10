import React from "react";
import isEmpty from 'lodash/isEmpty'
import PokemonDetailEvolutionContainer from './PokemonDetailEvolutionContainer.jsx';

const PokemonDetailEvolution = (props) => {
    let evolution = props.evolution
    let evolution_details = evolution.evolution_details
    let evolves_to = evolution.evolves_to
    let speciesName = evolution.species.name
    // console.log(props)
    const isFirstInChain = isEmpty(evolution_details)
    return(
        <div className="pokemon-evolution__step">
            {isFirstInChain || (
                <svg className="pokemon-evolution__arrow" viewBox="0 0 26 13">
                    <path d="M20.854.146a.5.5 0 0 0-.707.707L24.293 5 .5 5a.5.5 0 0 0 0 1h23.793l-4.146 4.145a.5.5 0 0 0 .708.707l5-5a.5.5 0 0 0 0-.707L20.854.146z"/>
                </svg>
            )}
            {/* <p>{speciesName}</p> */}
            <PokemonDetailEvolutionContainer name={speciesName}/>
            <div className="pokemon-evolution__group">
                {evolves_to.map((nextEvolution) => (
                    <PokemonDetailEvolution key={nextEvolution.species.name} evolution={nextEvolution} />
                ))}
            </div>
        </div>
    )
    // return (
    //     <div>asd</div>
    // )
}

export default PokemonDetailEvolution;
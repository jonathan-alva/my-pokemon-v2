import React from 'react'

const PokemonDetailAbilities = (props) => {
    let abilities = props.abilities
    return(
        <div>
            <ul>
            {abilities.map((ability, i) => {
                return (
                <li key={i}>
                    <strong>{ability.abilityName}</strong>
                    <span> - {ability.abilityDesc}</span>
                </li>
                );
            })}
            </ul>
        </div>
    )
}

export default PokemonDetailAbilities;
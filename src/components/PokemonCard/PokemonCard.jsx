import React from "react";
import "./PokemonCard.css";
import PokemonImage from "../PokemonImage/PokemonImage";
import PokemonNumber from "../PokemonNumber/PokemonNumber";
import PokemonName from "../PokemonName/PokemonName";
import PokemonNickname from "../PokemonNickname/PokemonNickname";
import PokemonType from "../PokemonType/PokemonType";
import PokemonOwnedCount from "../PokemonOwnedCount/PokemonOwnedCount";

const PokemonCardComponent = (props) => {
  return (
    <div
      className="pokemon-card"
      onMouseOver={props.handleOver}
      onClick={props.handleClick}
    >
      <div className="pokemon-card-header">
        <PokemonImage
          image={props.pokemon_avatar}
          containerClassName={props.containerClassName}
        />
        <PokemonNumber
          id={props.pokemon_number}
          pClass={`pokemon-card-number`}
        />
        <PokemonName
          name={props.pokemon_name}
          containerClass={`pokemon-card-name`}
          pClass={`mb-0`}
        />
        <PokemonOwnedCount owned_count={props.owned_count} displayOwned={props.displayOwned}/>
        <PokemonNickname
          name={props.pokemon_nickname}
          pClass={`nickname-card-title`}
        />
      </div>
      <PokemonType type={props.pokemon_types} />
      <button
        style={{ display: `${props.releaseButton}` }}
        className="btn btn-danger btn-sm"
        type="button"
        data-toggle="modal"
        data-target="#exampleModal"
        data-backdrop="static"
        data-keyboard="false"
        onClick={props.handleClickRelease}
      >
        Release
      </button>
    </div>
  );
};

export default PokemonCardComponent;

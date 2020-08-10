import React from "react";
import PokemonDetailAbilities from './PokemonDetailAbilities.jsx'
import PokemonDetailMoves from './PokemonDetailMoves.jsx'
import PokemonDetailOtherInfo from './PokemonDetailOtherInfo.jsx'
import PokemonDetailStatus from './PokemonDetailStatus.jsx'
import PokemonDetailEvolution from './PokemonDetailEvolution.jsx'

const PokemonDetailData = (props) => {
  let moves = props.moves;
  let abilities = props.abilities;
  let stats = props.stats;
  let evolution = props.evolution
  // console.log(props)
  return (
    <div className="container p-3">
      <div>
        <div className="text-center">
          <h3><u>Evolution Chain</u></h3>
          <div style={{display:"flex",justifyContent:"center",}}>
            {evolution && <PokemonDetailEvolution evolution={evolution} id={props.id}/>}
          </div>
        </div>
      </div>
      <div className="row mt-4 mb-4">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
          <div className="detail-stats mb-4">
            <h3><u>Base Status</u></h3>
            <PokemonDetailStatus stats={stats}/>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
          <div className="detail-abilities">
            <h3><u>Abilities</u></h3>
            <PokemonDetailAbilities abilities={abilities}/>
          </div>
          <div className="detail-other">
            <h3><u>Other Info</u></h3>
            <PokemonDetailOtherInfo weight={props.weight} height={props.height}/>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div className="detail-moves">
            <h3><u>Moves</u></h3>
            <PokemonDetailMoves moves={moves}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailData;

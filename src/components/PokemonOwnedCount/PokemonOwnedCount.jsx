import React from "react";

const PokemonOwnedCount = (props) => {
  	return (
		<div className="pt-1">
			<p style={{marginBottom:`0px`, display:props.displayOwned}}>{props.owned_count} Pokémon Owned</p>
		</div>
  	);
};

export default PokemonOwnedCount;

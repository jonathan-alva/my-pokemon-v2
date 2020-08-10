import React from "react";

const PokemonNumber = (props) => {
    return (
        <div className={props.containerClass}>
			<p className={props.pClass}>{"#"+props.id}</p>
		</div>
    );
}

export default PokemonNumber;

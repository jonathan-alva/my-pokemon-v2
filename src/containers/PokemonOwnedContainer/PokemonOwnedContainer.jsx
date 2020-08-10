import React, { Component } from "react";
import PokemonOwnedSidebar from "../../components/PokemonOwned/PokemonOwnedSidebar/PokemonOwnedSidebar";
import PokemonOwnedList from "../../components/PokemonOwned/PokemonOwnedList/PokemonOwnedList";


class PokemonOwnedContainer extends Component {
  render() {
    return (
		<div className="wrap wrapper">
			<div className="container-fluid pokemon-list-wrapper">
				<div className="pokemon-selected-box">
					<PokemonOwnedSidebar />
				</div>
				<div className="pokemon-owned-list-box">
					<PokemonOwnedList />
				</div>
			</div>
		</div>
    );
  }
}

export default PokemonOwnedContainer;

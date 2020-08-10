import React, { Component } from "react";
import PokemonSidebar from "../../components/PokemonList/PokemonSidebar/PokemonSidebar";
import PokemonList from "../../components/PokemonList/PokemonList/PokemonList";
import './PokemonListContainer.css';


class PokemonListContainer extends Component {
  render() {
    return (
		<div className="wrap wrapper">
			<div className="container-fluid pokemon-list-wrapper">
				<div className="pokemon-selected-box">
					<PokemonSidebar />
				</div>
				<div className="pokemon-list-box">
					<PokemonList />
				</div>
			</div>
		</div>
    );
  }
}

export default PokemonListContainer;

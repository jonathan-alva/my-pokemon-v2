import React, { Component } from "react";
import { connect } from "react-redux";
import PokemonImage from "./../../PokemonImage/PokemonImage";
import PokemonNumber from "./../../PokemonNumber/PokemonNumber";
import PokemonName from "./../../PokemonName/PokemonName";
// import PokemonSelectedOwned from "./PokemonSelectedOwned";
import PokemonType from "./../../PokemonType/PokemonType";
import PokemonGenus from "./../../PokemonGenus/PokemonGenus";
import "./PokemonSidebar.css";
import { getSelectedWildPokemon } from "./../../../redux/operations";
// import $ from 'jquery'

class PokemonSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon_image: null,
      pokemon_number: 0,
      pokemon_name: "",
      pokemon_type: [],
      pokemon_genus: "",
    };
  }

  getDataAPI = async () => {
    await this.props.selectedWildPokemon(
      this.props.pokemon.selected_pokemon_name
    );
  };

  async componentDidMount() {
    await this.getDataAPI();
    this.loadPokemonData();
  }

  loadPokemonData() {
    let pokemon = this.props.pokemon.selected_wild_pokemon;
    let pokemon_genus = pokemon.pokemon_genus;
    let pokemon_name = pokemon.pokemon_name;
    let pokemon_number = pokemon.pokemon_number;
    let pokemon_avatar = pokemon.pokemon_avatar;
    let pokemon_types = pokemon.pokemon_types;

    this.setState({
      pokemon_image: pokemon_avatar,
      pokemon_number: pokemon_number,
      pokemon_name: pokemon_name,
      pokemon_type: pokemon_types,
      pokemon_genus: pokemon_genus,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let prevPokemonState = prevProps.pokemon.selected_wild_pokemon.pokemon;
    let nextPokemonState = this.props.pokemon.selected_wild_pokemon.pokemon;
    if (prevPokemonState !== nextPokemonState) {
      this.loadPokemonData();
    }
  }

  render() {
    const imageLoaded = this.state.pokemon_image;
    return (
      <div className="text-center container-sidebar container">
        <div className="top-section">
          {imageLoaded !== null ? (
            <PokemonImage
              image={this.state.pokemon_image}
              width={`55`}
              imageClassName={`background`}
            />
          ) : (
            <img
              src={require("./../../../assets/images/pokeball.png")}
              width="65%"
              alt="Pokemon"
            />
          )}
        </div>
        <div className="bottom-section">
          <PokemonNumber
            id={this.state.pokemon_number}
            containerClass={`pokemon-number`}
            pClass={`pokemon-selected-number`}
          />
          <PokemonName
            name={this.state.pokemon_name}
            containerClass={`selected-pokemon-name`}
            pClass={`name-title`}
          />
          <PokemonGenus genus={this.state.pokemon_genus} />
          <PokemonType type={this.state.pokemon_type} />
          {/* <PokemonSelectedOwned /> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pokemon: state,
});

const mapDispatchToProps = {
  selectedWildPokemon: getSelectedWildPokemon,
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonSidebar);

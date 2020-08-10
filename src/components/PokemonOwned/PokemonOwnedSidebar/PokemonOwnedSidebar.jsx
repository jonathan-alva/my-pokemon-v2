import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import first from "lodash/first";
import PokemonImage from "./../../PokemonImage/PokemonImage";
import PokemonNumber from "./../../PokemonNumber/PokemonNumber";
import PokemonName from "./../../PokemonName/PokemonName";
import PokemonNickname from "./../../PokemonNickname/PokemonNickname";
// import PokemonSelectedOwned from "./PokemonSelectedOwned";
import PokemonType from "./../../PokemonType/PokemonType";
import PokemonGenus from "./../../PokemonGenus/PokemonGenus";
// import ButtonComponent from "./../../ButtonComponent/ButtonComponent";
import "./PokemonOwnedSidebar.css";
import { getSelectedOwnedPokemon } from "./../../../redux/operations";

class PokemonOwnedSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon_image: null,
      pokemon_number: 0,
      pokemon_name: "",
      pokemon_type: [],
      pokemon_genus: "",
      pokemon_nickname: "",
      pokemon_owned_count: 0
    };
  }

  getData = async () => {
    await this.props.selectedOwnedPokemon(
      this.props.pokemon.selected_owned_pokemon.pokemon_owned_id
    );
  };

  async componentDidMount() {
    await this.getData();
    this.loadPokemonData();
  }

  loadPokemonData() {
    let pokemonOwnedList = this.props.pokemon.owned_pokemon;
    this.setState({
      pokemon_owned_count: pokemonOwnedList.length
    })
    let pokemon = this.props.pokemon.selected_owned_pokemon;
    let isEmptyData = isEmpty(pokemon);
    let isEmptyList = isEmpty(pokemonOwnedList);
    if (!isEmptyList) {
      if (isEmptyData) {
        pokemon = first(this.props.pokemon.owned_pokemon);
      }
      let pokemon_genus = pokemon.pokemon_genus;
      let pokemon_name = pokemon.pokemon_name;
      let pokemon_number = pokemon.pokemon_number;
      let pokemon_avatar = pokemon.pokemon_avatar;
      let pokemon_types = pokemon.pokemon_types;
      let pokemon_nickname = pokemon.pokemon_nickname
      this.setState({
        pokemon_image: pokemon_avatar,
        pokemon_number: pokemon_number,
        pokemon_name: pokemon_name,
        pokemon_type: pokemon_types,
        pokemon_genus: pokemon_genus,
        pokemon_nickname: pokemon_nickname
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    let prevPokemonState = prevProps.pokemon.selected_owned_pokemon.pokemon_owned_id;
    let nextPokemonState = this.props.pokemon.selected_owned_pokemon.pokemon_owned_id;
    // console.log(prevPokemonState, nextPokemonState)
    // console.log(prevProps.pokemon)
    // console.log(this.props.pokemon)
    if (prevPokemonState !== nextPokemonState) {
      this.loadPokemonData();
    }
    if (this.props.pokemon.owned_pokemon.length !== this.state.pokemon_owned_count){
      let pokemonOwnedList = this.props.pokemon.owned_pokemon;
      if(!isEmpty(pokemonOwnedList)){
        let pokemon = first(this.props.pokemon.owned_pokemon);
        let pokemon_genus = pokemon.pokemon_genus;
        let pokemon_name = pokemon.pokemon_name;
        let pokemon_number = pokemon.pokemon_number;
        let pokemon_avatar = pokemon.pokemon_avatar;
        let pokemon_types = pokemon.pokemon_types;
        let pokemon_nickname = pokemon.pokemon_nickname
        this.setState({
          pokemon_image: pokemon_avatar,
          pokemon_number: pokemon_number,
          pokemon_name: pokemon_name,
          pokemon_type: pokemon_types,
          pokemon_genus: pokemon_genus,
          pokemon_nickname: pokemon_nickname,
          pokemon_owned_count: pokemonOwnedList.length
        });
      }
      else{
        this.setState({
          pokemon_image: null,
          pokemon_number: 0,
          pokemon_name: "",
          pokemon_type: [],
          pokemon_genus: "",
          pokemon_nickname: "",
          pokemon_owned_count: pokemonOwnedList.length
        })
      }
    }
  }

  render() {
    const imageLoaded = this.state.pokemon_image
    return (
      <div className="text-center container-sidebar container">
        <div className="top-section">
          {imageLoaded !== null ?<PokemonImage
            image={this.state.pokemon_image}
            width={`55`}
            imageClassName={`background`}
          />:
          <img src={require("./../../../assets/images/pokeball.png")} width="65%" alt="Pokemon"/>
          }
          
          <PokemonNumber
            id={this.state.pokemon_number}
            containerClass={`mt-3`}
            pClass={`pokemon-selected-number`}
          />
          
        </div>
        <div className="bottom-section">
          <PokemonName
            name={this.state.pokemon_name}
            containerClass={`selected-pokemon-name`}
            pClass={`name-title`}
          />
          <PokemonNickname
            name={this.state.pokemon_nickname}
            pClass={`nickname-title`}
          />
          <PokemonGenus genus={this.state.pokemon_genus} />
          <PokemonType type={this.state.pokemon_type} />
          {/* <PokemonSelectedOwned /> */}
          <div className="pokemon-selected-nav">
            <div>{/* <ButtonComponent text="Release" /> */}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pokemon: state,
});

const mapDispatchToProps = {
  selectedOwnedPokemon: getSelectedOwnedPokemon,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonOwnedSidebar);

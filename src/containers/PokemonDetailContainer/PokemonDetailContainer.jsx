import React, { Component } from "react";
import PokemonDetailHeader from "../../components/PokemonDetail/PokemonDetailHeader/PokemonDetailHeader";
import PokemonDetailData from "../../components/PokemonDetail/PokemonDetailData/PokemonDetailData";
import { connect } from "react-redux";
import { getDetailPokemonData } from "./../../redux/operations";

class PokemonDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonName: "",
      pokemonAvatar: "",
      pokemonGenus: "",
      pokemonTypes: [],
      pokemonNumber: "",
      pokemonEvolutionData: [],
      pokemonMoves: [],
      pokemonAbilities: [],
      pokemonHeight: "",
      pokemonWeight: "",
      pokemonStats: [],
      pokemonId: "",
      pokemonCount: 0
    };
  }

  async componentDidMount() {
    let pokemon_name = this.props.match.params.pokemonName;
    await this.props.detailPokemon(pokemon_name);
    const data = this.props.pokemon.data;
    const currentPokemonOwnedCountList = this.props.pokemon.owned_pokemon_list_with_count
    let currentPokemonCount = 0
    for (let i = 0; i< currentPokemonOwnedCountList.length; i++){
      if(parseInt(currentPokemonOwnedCountList[i].pokemon_id) === parseInt(pokemon_name)){
        currentPokemonCount = currentPokemonOwnedCountList[i].countPokemon
      }
    }
    this.setState(
      {
        pokemonName: data.pokemonName,
        pokemonAvatar: data.pokemonAvatar,
        pokemonGenus: data.pokemonGenus,
        pokemonTypes: data.pokemonTypes,
        pokemonNumber: data.pokemonNumber,
        pokemonEvolutionData: data.pokemonEvolutionData,
        pokemonMoves: data.pokemonMoves,
        pokemonAbilities: data.pokemonAbilities,
        pokemonHeight: data.pokemonHeight,
        pokemonWeight: data.pokemonWeight,
        pokemonStats: data.pokemonStats,
        pokemonId: pokemon_name,
        pokemonCount: currentPokemonCount
      }
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let prevPokemonState = prevProps.pokemon.owned_pokemon.length;
    let nextPokemonState = this.props.pokemon.owned_pokemon.length;
    if (prevPokemonState !== nextPokemonState) {
      let pokemon_name = this.props.match.params.pokemonName;
      const currentPokemonOwnedCountList = this.props.pokemon.owned_pokemon_list_with_count
      let currentPokemonCount = 0
      for (let i = 0; i< currentPokemonOwnedCountList.length; i++){
        if(parseInt(currentPokemonOwnedCountList[i].pokemon_id) === parseInt(pokemon_name)){
          currentPokemonCount = currentPokemonOwnedCountList[i].countPokemon
        }
      }
      this.setState({
        pokemonCount: currentPokemonCount
      })
    }
  }

  render() {
    return (
      <div className="wrap">
        <div className="container-fluid">
          <div className="pokemon-detail-header">
            {
              this.state.pokemonName &&
              this.state.pokemonAvatar &&
              this.state.pokemonGenus && 
              this.state.pokemonTypes &&
              this.state.pokemonNumber &&
              this.state.pokemonId &&
              <PokemonDetailHeader
              name={this.state.pokemonName}
              avatar={this.state.pokemonAvatar}
              genus={this.state.pokemonGenus}
              types={this.state.pokemonTypes}
              number={this.state.pokemonNumber}
              id={this.state.pokemonId}
              count={this.state.pokemonCount}
            />
            }
          </div>
          <div className="pokemon-detail-body">
            {this.state.pokemonHeight &&
            this.state.pokemonWeight && 
            this.state.pokemonAbilities &&
            this.state.pokemonMoves &&
            this.state.pokemonStats &&
            this.state.pokemonEvolutionData && 
            this.state.pokemonId &&
            <PokemonDetailData
              height={this.state.pokemonHeight}
              weight={this.state.pokemonWeight}
              abilities={this.state.pokemonAbilities}
              moves={this.state.pokemonMoves}
              stats={this.state.pokemonStats}
              evolution={this.state.pokemonEvolutionData}
              id={this.state.pokemonId}
            />}
            
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
  detailPokemon: getDetailPokemonData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonDetailContainer);

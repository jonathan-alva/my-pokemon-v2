import React, { Component } from "react";
import { connect } from "react-redux";
import { getDefaultSpeciesPokemon } from "../../../redux/operations";

class PokemonDetailEvolutionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonImage: null,
      pokemonNumber: 0,
      pokemonName: "",
      pokemonTypes: [],
    };
  }

  getDataAPI = async () => {
    // console.log(this.props.name)
    await this.props.getPokemonData(
      this.props.name
    );
  };

  async componentDidMount() {
    await this.getDataAPI();
    this.loadPokemonData();
  }
  loadPokemonData() {
    let pokemon = this.props.pokemon.pokemon;
    // console.log(this.props)
    let pokemonName = pokemon.name;
    let pokemonNumber = pokemon.number;
    let pokemonAvatar = pokemon.avatar;
    let pokemonTypes = pokemon.types;

    this.setState({
      pokemonImage: pokemonAvatar,
      pokemonNumber: "#"+pokemonNumber,
      pokemonName: pokemonName,
      pokemonTypes: pokemonTypes,
    });
  }
  render() {
    // return <div>{this.props.name}</div>;
    return (
      <div>
        <div><img src={this.state.pokemonImage} alt="Pokemon" /></div>
        <div><span>{this.state.pokemonNumber}</span></div>
        <div><span>{this.state.pokemonName}</span></div>
        <div className="pokemon-types">
            {this.state.pokemonTypes.map(res=>{
                return(
                    <span className={`pokemon-type -${res.type.name}`} key={res.slot}>
                        {res.type.name}
                    </span>
                );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pokemon: state,
});

const mapDispatchToProps = {
  getPokemonData: getDefaultSpeciesPokemon,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonDetailEvolutionContainer);

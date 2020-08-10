import React, { Component } from 'react';
import PokemonCard from "./../../PokemonCard/PokemonCard"
import './PokemonList.css';
import { 
    getSelectedWildPokemon,
    getLoadMorePokemon,
    reloadPokemonLoadedList
 } from "../../../redux/operations";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class PokemonList extends Component {
    constructor(){
        super();
        this.state = {
            loading: false,
            page: 0,
            prevY: 0
        }
        this.loadMore = this.loadMore.bind(this);
        this.firstLoad = this.firstLoad.bind(this);
    }

    firstLoad = async () =>{
        let count = this.props.selected_wild_pokemon.count_pokemon_loaded
        await this.props.loadMorePokemon(32,count)
        this.setState({
            loading: false
        })
    }

    async componentDidMount(){
        if(this.props.selected_wild_pokemon.count_pokemon_loaded === 0){
            await this.firstLoad();
        }
        else{
            await this.props.reloadPokemonList()
        }
        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        if(this.loadingRef != null){
            this.observer.observe(this.loadingRef);
        }
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            if(this.state.loading === false){
                this.loadMore();
            }
        }
        this.setState({ prevY: y });
    }

    onChangePokemon = async (name) => {
        await this.props.selectedWildPokemon(name);
      }

    loadMore = async () => {
        this.setState({
            loading: true
        })
        let currentCountPokemonLoaded = this.props.selected_wild_pokemon.count_pokemon_loaded
        
        await this.props.loadMorePokemon(8,currentCountPokemonLoaded)
        this.setState({
            loading: false
        })
    }

    render(){
        // Additional css
        const loadingCSS = {
            height: "100px",
            margin: "30px"
        };
        // To change the loading icon behavior
        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

        return (
            <div className="mt-4">
                <div className="row">
                    {
                        this.props.selected_wild_pokemon.loaded_pokemon.map(res=>{
                            return(
                                res.map((pokemon, i) =>{
                                    // console.log(pokemon)
                                    return(
                                        <div className="col-6 col-xs-4 col-sm-4 col-md-3" key={i}>
                                            <Link to={`/pokemon/detail/${pokemon.pokemon_id}`}>
                                                <PokemonCard
                                                    pokemon_name={pokemon.pokemon_name_title}
                                                    pokemon_url={pokemon.pokemon_name_url}
                                                    pokemon_number={pokemon.pokemon_number}
                                                    pokemon_avatar={pokemon.pokemon_avatar}
                                                    pokemon_types={pokemon.pokemon_types}
                                                    containerClassName={`pokemon-card-image-list`}
                                                    handleOver={()=>this.onChangePokemon(pokemon.pokemon_name_url)}
                                                    releaseButton={"none"}
                                                    owned_count={pokemon.pokemon_owned_count}
                                                />
                                            </Link>
                                        </div>
                                    )
                                })
                            )
                        })
                    }
                    
                </div>
                <div className="text-center" ref={loadingRef => (this.loadingRef = loadingRef)} style={loadingCSS}>
                    <span style={loadingTextCSS}>Loading...</span>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    selected_wild_pokemon: state,
  });
  
  const mapDispatchToProps = {
    selectedWildPokemon: getSelectedWildPokemon,
    loadMorePokemon: getLoadMorePokemon,
    reloadPokemonList: reloadPokemonLoadedList,
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PokemonList);
import React, { Component } from 'react';
import PokemonCard from "./../../PokemonCard/PokemonCard"
import './PokemonOwnedList.css';
import { 
    getSelectedOwnedPokemon,
    getAllPokemonOwned,
    releasePokemonOwned
 } from "../../../redux/operations";
import { connect } from "react-redux";

class PokemonOwnedList extends Component {
    constructor(){
        super();
        this.state = {
            message: "Release This Pokémon ?",
            ownedIdClick: ""
        }
    }

    async componentDidMount(){
        await this.props.getAllPokemonOwned()
    }

    onChangePokemon = async (pokemon_owned_id) => {
        await this.props.selectedOwnedPokemon(pokemon_owned_id);
    }
    onClickCancel = () => {
        this.setState({
            message: "Release This Pokémon ?",
        });
    };
    onClickRelease = async (pokemon_owned_id) => {
        console.log(pokemon_owned_id)
        this.setState({
            ownedIdClick: pokemon_owned_id
        })
        // await this.props.releasePokemon(pokemon_owned_id)
    }
    onClickConfirmRelease = async () => {
        await this.props.releasePokemon(this.state.ownedIdClick)
    }

    render(){
        const ownedPokemonList = this.props.stateData.owned_pokemon
        return (
            <div className="">
                {
                    ownedPokemonList.length !== 0 ? 
                    <div className="row">
                    {
                        this.props.stateData.owned_pokemon.map((res, i)=>{
                            return(
                                <div className="col-6 col-xs-4 col-sm-4 col-md-3" key={i}>
                                    <PokemonCard
                                        pokemon_name={res.pokemon_name}
                                        pokemon_number={res.pokemon_number}
                                        pokemon_avatar={res.pokemon_avatar}
                                        pokemon_types={res.pokemon_types}
                                        pokemon_nickname={res.pokemon_nickname}
                                        containerClassName={`pokemon-card-owner-image`}
                                        handleClick={()=>this.onChangePokemon(res.pokemon_owned_id)}
                                        releaseButton={"inline-block"}
                                        handleClickRelease={()=>this.onClickRelease(res.pokemon_owned_id)}
                                        displayOwned={`none`}
                                    />
                                </div>
                            )
                        })
                    }
                        <div>
                            <div
                            className="modal fade"
                            id="exampleModal"
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                            >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">
                                            Release Pokémon
                                            </h5>
                                            <button
                                                type="button"
                                                className="close"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                                onClick={() => this.onClickCancel()}
                                            >
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            {this.state.message}
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-dismiss="modal"
                                                onClick={() => this.onClickCancel()}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => this.onClickConfirmRelease()}
                                                data-dismiss="modal"
                                            >
                                                Release
                                            </button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="text-center">No Pokemon Catch</div>
                }
                
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    stateData: state,
});
  
const mapDispatchToProps = {
    selectedOwnedPokemon: getSelectedOwnedPokemon,
    getAllPokemonOwned: getAllPokemonOwned,
    releasePokemon: releasePokemonOwned
};

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PokemonOwnedList);
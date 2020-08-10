import React, { Component } from "react";
import { connect } from "react-redux";
import PokemonImage from "./../../PokemonImage/PokemonImage";
import PokemonNumber from "./../../PokemonNumber/PokemonNumber";
import PokemonName from "./../../PokemonName/PokemonName";
import PokemonType from "./../../PokemonType/PokemonType";
import PokemonGenus from "./../../PokemonGenus/PokemonGenus";
import PokemonOwnedCount from './../../PokemonOwnedCount/PokemonOwnedCount';
import { catchPokemon } from "./../../../redux/operations";

class PokemonDetailHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catchMessage: "You only have 50% chance to catch this Pokémon.",
      isShow: "none",
      showCatchButton: "block",
      showSaveButton: "none",
      nickname: "",
    };
  }

  handleFormChange = (event) => {
    let nickname = { ...this.state.nickname };
    if (event.target.name === "nickname") {
      nickname = event.target.value;
    }
    this.setState({
      nickname: nickname,
    });
  };

  onClickCatch = () => {
    let random = Math.random() >= 0.5;
    if (random) {
      this.setState({
        catchMessage: "Congratulation ! You catch the Pokémon. Enter Nickname",
        isShow: "block",
        showCatchButton: "none",
        showSaveButton: "block",
      });
    } else {
      this.setState({
        catchMessage: "Failed to catch this Pokémon.",
      });
    }
  };
  onClickSave = async () => {
    let pokemonId = this.props.id;
    let pokemonNickname = this.state.nickname
    await this.props.catchPokemon(pokemonId, pokemonNickname);
    this.setState({
      catchMessage: "You only have 50% chance to catch this Pokemon.",
      isShow: "none",
      showCatchButton: "block",
      showSaveButton: "none",
      nickname: ""
    });
  };

  onClickCancel = () => {
    this.setState({
      catchMessage: "You only have 50% chance to catch this Pokemon.",
      isShow: "none",
      showCatchButton: "block",
      showSaveButton: "none",
      nickname: ""
    });
  };

  render() {
    const imageLoaded = this.props.avatar;
    // console.log(this.props)
    return (
      <div className="text-center container-detail-header">
        <div className="top-section">
          {
            imageLoaded !== "" ?
            <PokemonImage
              image={this.props.avatar}
              width={`55`}
              imageClassName={`background`}
            />
            :
            <img
              src={require("./../../../assets/images/pokeball.png")}
              width="15%"
              alt="Pokemon"
            />
          }
          
          <PokemonNumber
            id={this.props.number}
            containerClass={`mt-3`}
            pClass={`pokemon-selected-number`}
          />
          <PokemonName
            name={this.props.name}
            containerClass={`selected-pokemon-name`}
            pClass={`display-4`}
          />
          <PokemonGenus genus={this.props.genus} />
        </div>
        <div className="bottom-section">
          <PokemonType type={this.props.types} />
          <PokemonOwnedCount owned_count={this.props.count} />
          <div className="pokemon-selected-nav">
            <div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  data-backdrop="static"
                  data-keyboard="false"
                >
                  Catch
                </button>

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
                          Catch Pokémon
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
                        {this.state.catchMessage}
                        <div style={{ display: `${this.state.isShow}` }}>
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              name="nickname"
                              value={this.state.nickname}
                              onChange={this.handleFormChange}
                              className="form-control"
                              placeholder="Nickname"
                              aria-label="Nickname"
                              aria-describedby="basic-addon1"
                              maxLength="18"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                          onClick={() => this.onClickCancel()}
                        >
                          Leave
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => this.onClickCatch()}
                          style={{ display: `${this.state.showCatchButton}` }}
                        >
                          Catch
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => this.onClickSave()}
                          data-dismiss="modal"
                          style={{ display: `${this.state.showSaveButton}` }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  catchPokemon: catchPokemon,
};

export default connect(null, mapDispatchToProps)(PokemonDetailHeader);

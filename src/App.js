import React, { Component } from "react";
import { Route, NavLink, HashRouter, Redirect } from "react-router-dom";
import PokemonListContainer from './containers/PokemonListContainer/PokemonListContainer';
import PokemonOwnedContainer from './containers/PokemonOwnedContainer/PokemonOwnedContainer';
import PokemonDetailContainer from './containers/PokemonDetailContainer/PokemonDetailContainer';

class App extends Component {
	render() {
		return (
			<HashRouter>
				<div>
					<nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="main_nav">
							<ul className="navbar-nav mx-auto">
								<li className="nav-item"><NavLink className="nav-link" exact to="/pokemon-list">Pokémon List</NavLink></li>
								<li className="nav-item"><NavLink className="nav-link" to="/pokemon-owned">My Pokémon</NavLink></li>
							</ul>
							{/* <a className="btn btn-warning" href="#">Reset</a> */}
						</div>
					</nav>
					<div>
						<Route exact path="/pokemon-list" component={PokemonListContainer} />
						<Route exact path="/">
							<Redirect to="/pokemon-list" />
						</Route>
						<Route path="/pokemon/detail/:pokemonName" component={PokemonDetailContainer}/>
						<Route path="/pokemon-owned/" component={PokemonOwnedContainer}/>
						{/* <Route path="*" component={NotFoundRoute} /> */}
					</div>
				</div>
			</HashRouter>
		)
	}
}
export default App
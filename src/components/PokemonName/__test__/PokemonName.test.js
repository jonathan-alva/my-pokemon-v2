import React from 'react';
import ReactDOM from 'react-dom';
import PokemonName from './../PokemonName';
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);
it("renders without crash", () => {
    const div = document.createElement('div');
    ReactDOM.render(<PokemonName />, div)
})

it("render correctly", () => {
    const {getByTestId} = render(<PokemonName containerClass="container"/>)
    expect(getByTestId('pokemon-name-div')).toHaveClass("container")
})

it("render correctly", () => {
    const {getByTestId} = render(<PokemonName pClass="text-center"/>)
    expect(getByTestId('pokemon-name-text')).toHaveClass("text-center")
})

it("render correctly", () => {
    const {getByTestId} = render(<PokemonName name="Bulbasaur"/>)
    expect(getByTestId('pokemon-name-text')).toHaveTextContent("Bulbasaur")
})
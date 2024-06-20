import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      const fetchedPokemon = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokeData = await axios.get(pokemon.url);
          return pokeData.data;
        })
      );
      setPokemonList(fetchedPokemon);
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Pokémon List</h1>
      <SearchBar onSearchChange={setSearchField} />
      <div className="pokemon-list">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;

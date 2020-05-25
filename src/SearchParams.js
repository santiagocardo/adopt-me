import React, { useState, useEffect, useContext } from "react"
import pet, { ANIMALS } from "@frontendmasters/pet"

import useDropdown from './useDropdown'
import Results from './Results'
import ThemeContext from "./ThemeContext"

const SearchParams = () => {
  const [location, setLocation] = useState('Seattle, WA')
  const [breeds, setBreeds] = useState([])
  const [animal, AnimalDropdown] = useDropdown('Aminal', 'dog', ANIMALS)
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds)
  const [pets, setPets] = useState([])
  const [theme, setTheme] = useContext(ThemeContext)

  const requestPets = async () => {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    })

    setPets(animals || [])
  }

  useEffect(() => {
    setBreeds([])
    setBreed('')

    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      const breedStrings = apiBreeds.map(({ name }) => name)
      setBreeds(breedStrings)
    }).catch(console.error)
  }, [animal, setBreed, setBreeds])

  return (
    <div className="search-params">
      <form onSubmit={e => {
        e.preventDefault()
        requestPets()
      }}>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={e => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            onBlur={e => setTheme(e.target.value)}
          >
            <option value="tomato">Tomato</option>
            <option value="papayawhip">Papayawhip</option>
            <option value="rebeccapurple">Rebeccapurple</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  )
}

export default SearchParams

import React, { useState, useEffect } from "react"
import pet, { ANIMALS } from "@frontendmasters/pet"
import { connect } from "react-redux"

import useDropdown from './useDropdown'
import Results from './Results'
import changeTheme from "./action-creators/changeTheme"
import changeLocation from "./action-creators/changeLocation"

const SearchParams = (props) => {
  const [breeds, setBreeds] = useState([])
  const [animal, AnimalDropdown] = useDropdown('Aminal', 'dog', ANIMALS)
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds)
  const [pets, setPets] = useState([])

  const requestPets = async () => {
    const { animals } = await pet.animals({
      location: props.location,
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
            value={props.location}
            placeholder="Location"
            onChange={e => props.updateLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={props.theme}
            onChange={e => props.setTheme(e.target.value)}
            onBlur={e => props.setTheme(e.target.value)}
          >
            <option value="tomato">Tomato</option>
            <option value="papayawhip">Papayawhip</option>
            <option value="rebeccapurple">Rebeccapurple</option>
          </select>
        </label>
        <button style={{ backgroundColor: props.theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  )
}

const mapStateToProps = ({ theme, location }) => ({ theme, location })

const mapDispatchToProps = dispatch => ({
  setTheme: theme => dispatch(changeTheme(theme)),
  updateLocation: location => dispatch(changeLocation(location))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchParams)

import React from "react";
import pf from "petfinder-client";
import Pet from "./Pet";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

// Class component
// makes stuff visible
// in this case -> Pet
class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: []
    };
  }
  componentDidMount() {
    // lifecycle method
    petfinder.pet
      .find({ output: "full", location: "Los Angeles, CA" })
      .then(data => {
        let pets;

        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        this.setState({
          // same as pets: pets - if both names are the same
          pets
        });
      });
  }

  render() {
    return (
      <div className="search">
        {this.state.pets.map(pet => {
          let breed;

          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
          } else {
            breed = pet.breeds.breed;
          }
          return (
            <Pet
              key={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
        {/* Prints everything from API to the screen */}
        {/* <pre>
          <code>{JSON.stringify(this.state, null, 4)}</code>
        </pre> */}
      </div>
    );
  }
}

export default Results;

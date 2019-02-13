import React from "react";
import { Link } from "@reach/router";

// Class Pet
class Pet extends React.Component {
  render() {
    // has to return markup
    // required parameters ->
    const { name, animal, breed, media, location, id } = this.props;

    let photos = [];

    // Checks if there are any photos
    if (media && media.photos && media.photos.photo) {
      // filter is same as map function
      photos = media.photos.photo.filter(photo => photo["@size"] == "pn");
    }
    let hero = "https://placecorgi.com/300/300";

    if (photos[0] && photos[0].value) {
      hero = photos[0].value;
    }

    return (
      // Links to url /details/id
      <Link to={`/details/${id}`} className="pet">
        <div className="image-container">
          <img src={hero} alt={name} />
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
        </div>
      </Link>
    );
  }
}

export default Pet;

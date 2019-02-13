import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };

  // Another lifecycle brand new method
  // Easy to test
  // Makes render() method easier and less complicated
  static getDerivedStateFromProps({ media }) {
    let photos = [];

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    return { photos };
  }

  handleIndexClick = event => {
    // what is "this"???
    // 2 ways to handle this
    // 1. constructor if not using class properties
    /* constructor(props) {
      super(props);
      this.handleIndexClick = this.handleIndexClick.bind(this);
    }
    */
    // 2. If using class properties (What I do):
    // use arrow function "handleIndexClick = event => {}"
    // It doesn't create a new scope
    this.setState({
      // + sign in the beginning makes a string into a number
      active: +event.target.dataset.index
    });
  };

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active].value} alt="Happy animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            /* eslint-disable-next-line */
            <img
              onClick={this.handleIndexClick}
              key={photo.value}
              data-index={index}
              src={photo.value}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;

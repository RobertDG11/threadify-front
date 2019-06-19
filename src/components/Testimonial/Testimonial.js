import React, { Component } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Slide from "./Slide";
import axios from "axios";
import { Header, Icon } from "semantic-ui-react";

import styles from "./Testimonial.module.scss";

class Testimonial extends Component {
  state = {
    persons: []
  };

  galleryItems = () => {
    const list = [];
    this.state.persons.forEach((item, i) =>
      list.push(
        <Slide
          name={`${item.name.first} ${item.name.last}`}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempus eu mi quis luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac interdum nisl. Sed convallis lacus et venenatis sagittis. Aliquam hendrerit mollis justo, et feugiat mi dapibus nec. Sed hendrerit augue tincidunt lacus accumsan, sed cursus justo tristique. Praesent rutrum nulla id erat venenatis dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempus eu mi quis luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac interdum nisl. Sed convallis lacus et venenatis sagittis. Aliquam hendrerit mollis justo, et feugiat mi dapibus nec. Sed hendrerit augue tincidunt lacus accumsan, sed cursus justo tristique. Praesent rutrum nulla id erat venenatis dignissim."
          image={item.picture.large}
        />
      )
    );
    return list;
  };

  getUsers = async () => {
    const { data: posts } = await axios.get(
      "https://randomuser.me/api/?results=30&nat=de,fr,gb&inc=name,picture&noinfo"
    );
    this.setState({ persons: posts.results });
  };

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const responsive = {
      0: { items: 1 },
      767: { items: 2 },
      1024: { items: 3 }
    };
    const galleryItems = this.galleryItems();
    return (
      <div className={styles.Carousel}>
        <AliceCarousel
          items={galleryItems}
          responsive={responsive}
          buttonsDisabled
          fadeOutAnimation
          autoPlay
          autoPlayInterval={5000}
        />
      </div>
    );
  }
}

export default Testimonial;

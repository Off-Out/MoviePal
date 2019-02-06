import React, { Component } from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-paper';

console.disableYellowBox = true;

export class MovieImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
    };
  }

  componentDidMount = async () => {
    const movie = this.props.movie;
    const { data: image } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=ff07e7936855ddf8722d9395aa1272d2&language=en-US&query=${
        movie.title
      }&page=1&include_adult=false`
    );
    const Url = image.results[0].poster_path;
    const imageURL = `http://image.tmdb.org/t/p/w185/${Url}`;

    this.setState({ image: imageURL });
  };
  vw(percentageWidth) {
    return Dimensions.get('window').width * (percentageWidth / 100);
  }

  vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
  }
  render() {
    const movie = this.props.movie;
    return (
      <Card.Cover
        style={{
          maxWidth: Dimensions.get('window').width * (35 / 100),
        }}
        source={{
          uri: this.state.image,
        }}
      />
    );
  }
}

export default MovieImg;

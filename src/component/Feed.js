import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import { Chip } from 'react-native-paper'
import { Container, Header, Title, Content, Card, CardItem, Thumbnail, Text, Input, Button, Icon, Left, Body, Right } from 'native-base';
import FeedBackEnd from './FeedBackEnd';
import Comment from '../component/Comment'
import {database} from '../firebase'

export default class Feed extends Component {
  constructor(props) {
    super(props)

    const {feed} = this.props

    this.state = {
      feed: {
        likes: feed.likes || '',
        comments: [],
      },
      showComment: 'none',
      newComment: ''
    }
  }

  timeSince = (timeStamp) => {
    let now = new Date(),
      secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
    if(secondsPast < 60){
      return parseInt(secondsPast) + 's';
    }
    if(secondsPast < 3600){
      return parseInt(secondsPast/60) + 'm';
    }
    if(secondsPast <= 86400){
      return parseInt(secondsPast/3600) + 'h';
    }
    if(secondsPast > 86400){
        day = timeStamp.getDate();
        month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
        year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
        return day + " " + month + year;
    }
  }

  componentDidMount () {
    database.ref(`/feeds/${this.props.feed._id}`).on('value', snapshot => {
      this.setState({feed: {
        likes: snapshot.val().likes,
        comments: snapshot.val().comments,
      } })
    })
  }

  handleInput = (text) => {
    this.setState({ newComment: text });
  };

  render() {
    const {feed} = this.props;
    const postTime = this.timeSince(feed.createdAt);
    let display = this.state.showComment

    return (
      <Card>
        <CardItem>
          <Text style={{fontSize: 14}}>{feed.userName} </Text>
          <Text style={{fontSize: 12}} note> GeekyAnts</Text>
        </CardItem>
        <CardItem >
          <Text>{feed.context}</Text>
        </CardItem>
        <CardItem style={styles.footer} footer bordered>
          <Left>
            <Button
            transparent
            onPress={() => FeedBackEnd.likePost(feed._id)}
            >
              <Icon active name="thumbs-up" />
              <Text style={{paddingLeft: 8}}>{this.state.feed.likes} Likes</Text>
            </Button>
            <Button
            style={{paddingTop: 3}}
            transparent
              onPress={() => {
                if (this.state.showCommment === 'none') {
                  console.log("pressing COMMENT, none")
                  console.log(this.state.showComment)
                  this.setState({showComment: 'flex'})
                } else {
                  console.log("pressing COMMENT, flex", this.state.showComment)
                  this.setState({showComment : 'none'})
                }
              }}
            >
              <Icon active name="chatbubbles" />
              <Text style={{paddingLeft: 6, paddingTop: 1}}> 3 Comments</Text>
            </Button>
            <CardItem style={{display}}>

            {/* {this.state.feeds.comments.map(comment => ( */}
            <Comment 
            key={this.props.feed._id} feedComments={this.state.feed.comments} feedId={this.props.feed._id}
            /> 
            {/* )
          )} */}
          {/* <Input
          style={styles.postInput}
          placeholder='Share comments...'
          onChangeText={text => this.handleInput(text)}
        />
        <Button
          primary
          transparent
          small
          style={styles.postBtn}
          onPress={() => {
            FeedBackEnd.postComment(this.props.feed._id, this.state.newComment)
            this.setState({newComment: ''})
          }}
        >
          <Text>COMMENT</Text>
        </Button> */}
            </CardItem>
            </Left>
          <Right>
            <Text style={{fontSize: 12}}>{postTime}</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    margin: 0,
    padding: 0,
    height: 35
  }
})
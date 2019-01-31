import * as React from 'react';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { Alert, View, Text, SafeAreaView, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

class EventCard extends React.Component {
  vw(percentageWidth) {
    return Dimensions.get('window').width * (percentageWidth / 100);
  }

  vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
  }
  shouldComponentUpdate(prevProps) {
    return prevProps.movie !== this.props.movie;
  }
  render() {
    console.log('card props', this.props.uri);
    return (
      <SafeAreaView>
        <Card
          style={{
            backgroundColor: 'white',
            width: this.vw(75),
            height: this.vh(45),
            /*  alignItems: 'center', */
            margin: 10,
          }}
          elevation={4}
        >
          <Card.Content>
            <Card.Cover
              source={{
                uri:
                  'http://developer.tmsimg.com/' +
                  this.props.uri +
                  '?api_key=w8xkqtbg6vf3aj5vdxmc4zjj',
              }}
            />
            {/*    {this.props.title ? ( */}
            <Title numberOfLines={2} style={{ alignSelf: 'center' }}>
              {this.props.title}
            </Title>
            <Paragraph style={{ alignSelf: 'center' }} numberOfLines={3}>
              {this.props.genres.join(', ')}
              {'   '}
              {this.props.rating}
            </Paragraph>

            <Paragraph style={{ alignSelf: 'center' }}>
              {this.props.theatre}
            </Paragraph>
            <Paragraph numberOfLines={5} ellipsizeMode="tail" style={{}}>
              {this.props.shortDescription}
            </Paragraph>
          </Card.Content>
          {/*  ) : (
                <Title>{this.props.state.user}</Title>
              )} */}

          {/*  {this.props.state.user ? (
                <Paragraph>{this.props.state.userEmail}</Paragraph>
              ) : ( */}

          {/* this.props.state.user ? null : ( */}
          {/* <Card.Actions style={{ justifyContent: 'center' }}>
              <Button
                onPress={() =>
                  Alert.alert(
                    'Add to Calendar',
                    'Calendar Options',
                    [
                      {
                        text: 'Google Calendar',
                        onPress: () => console.log('ADD TO GOOGLE CALENDAR'),
                      },
                      { text: 'Outlook Calendar' },
                      { text: 'virtually have us write it in your planner' },
                    ],
                    { cancelable: false }
                  )
                }
              >
                Add to Calendar
              </Button>
              <Button>Back to Map</Button>
            </Card.Actions> */}
        </Card>
      </SafeAreaView>
    );
  }
}

export default EventCard;

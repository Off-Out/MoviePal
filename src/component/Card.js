import * as React from 'react';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { Alert, View, Text, SafeAreaView } from 'react-native';

class EventCard extends React.Component {
  shouldComponentUpdate(prevProps) {
    return prevProps.state.movie !== this.props.state.movie;
  }
  render() {
    return (
      <SafeAreaView>
        <Card style={{ backgroundColor: 'white' }} elevation={4}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 40,
              backgroundColor: 'white',
            }}
          >
            <Card.Content style={{ marginTop: 25, marginRight: 40 }}>
              {this.props.state.movie ? (
                <Title>{this.props.state.movie}</Title>
              ) : (
                <Title>{this.props.state.user}</Title>
              )}

              {this.props.state.user ? (
                <Paragraph>{this.props.state.userEmail}</Paragraph>
              ) : (
                <View>
                  <Paragraph style={{ alignSelf: 'right' }}>
                    {this.props.state.genres}
                    {'   '}
                    {this.props.state.rating}
                  </Paragraph>

                  <Paragraph>{this.props.state.theater}</Paragraph>
                  <Paragraph
                    numberOfLines={5}
                    ellipsizeMode="tail"
                    style={{ width: 200 }}
                  >
                    {this.props.state.shortDescription}
                  </Paragraph>
                </View>
              )}
            </Card.Content>
            <Card.Cover
              style={{
                alignContent: 'right',
                marginTop: 10,
                marginRight: 10,
                marginBottom: 10,
                width: 100,
              }}
              source={{
                uri:
                  'http://developer.tmsimg.com/assets/p14087450_v_v6_aa.jpg?api_key=w8xkqtbg6vf3aj5vdxmc4zjj',
              }}
            />
          </View>
          {this.props.state.user ? null : (
            <Card.Actions style={{ justifyContent: 'center' }}>
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
            </Card.Actions>
          )}
        </Card>
      </SafeAreaView>
    );
  }
}

export default EventCard;

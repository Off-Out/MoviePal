import * as React from 'react';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { Alert, View, Text } from 'react-native';

class EventCard extends React.Component {
  shouldComponentUpdate(prevProps) {
    return prevProps.state.genre !== this.props.state.genre;
  }
  render() {
    console.log('RENDER', this.props);
    if (this.props.image) {
      return <Text>...Loading</Text>;
    } else {
      return (
        <Card sytle={{ alignItems: 'stretch' }}>
          <View style={{ flexDirection: 'row' }}>
            <Card.Content style={{ marginTop: 25 }}>
              <Title>Today's Movie</Title>
              <Paragraph>USER/EVENT</Paragraph>
            </Card.Content>
            <Card.Cover
              style={{
                marginTop: 10,
                marginRight: 10,
                marginBottom: 10,
                width: 100,
                height: 100,
              }}
              source={{ uri: this.props.state.image }}
            />
          </View>
          {this.props.user ? null : (
            <Card.Actions>
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
      );
    }
  }
}

export default EventCard;

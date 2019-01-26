import * as React from 'react';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { Alert } from 'react-native';

const EventCard = () => (
  <Card>
    <Card.Content>
      <Title>EVENT/USER</Title>
      <Paragraph>EVENT DETAILS/USER DETAILS</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
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
  </Card>
);
export default EventCard;

import * as React from 'react';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

const EventCard = () => (
  <Card>
    <Card.Content>
      <Title>EVENT/USER</Title>
      <Paragraph>EVENT DETAILS/USER DETAILS</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Add to Calendar</Button>
      <Button>Back to Map</Button>
    </Card.Actions>
  </Card>
);

export default EventCard;

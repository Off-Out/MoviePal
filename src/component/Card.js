import * as React from 'react';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

const EventCard = () => (
  <Card>
    <Card.Content>
      <Title>EVENT</Title>
      <Paragraph>EVENT DETAILS</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
);

export default EventCard;

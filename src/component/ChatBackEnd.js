import firebase, { auth, database } from '../firebase';

class ChatBackEnd {
  uid = '';
  name = '';
  chatId = '';
  messagesRef = null;

  constructor() {
    auth.onAuthStateChanged(async user => {
      if (user) {
        this.setUid(user.uid);
        // setTimeout(async () => {
          await database.ref(`/users/${user.uid}`).on('value', snapshot => {
            this.setName(snapshot.val().name);
            this.setChatId(snapshot.val().chatId);
          });
        }
        // , 2000
        // )};
    });
  }

  setUid(value) {
    this.uid = value;
  }

  getUid() {
    return this.uid;
  }

  setName(value) {
    this.name = value;
  }

  getName() {
    return this.name;
  }

  setChatId(value) {
    this.chatId = value;
  }
  // retrieve the messages from the Backend
  loadMessages(callback) {
    const today = new Date().toDateString();
    this.messagesRef = database.ref(
      `/chatroom/${today}/${this.chatId}/messages`
    );
    this.messagesRef.off();
    const onReceive = data => {
      const message = data.val();

      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      });
    };
    this.messagesRef.limitToLast(50).on('child_added', onReceive);
  }
  // send the message to the Backend
  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  }
  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new ChatBackEnd();

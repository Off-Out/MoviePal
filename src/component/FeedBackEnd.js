import firebase, { auth, database } from '../firebase';

class FeedBackEnd {
  uid = '';
  name = '';
  feedRef = null;

  constructor() {
    auth.onAuthStateChanged(async user => {
      if (user) {
        console.log('feed testing', user);
        this.setUid(user.uid);
        await database.ref(`/users/${user.uid}`).on('value', snapshot => {
          this.setName(snapshot.val().name);
        });
      }
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

  // retrieve the feeds from the Backend
  loadFeeds(callback) {
    const today = new Date().toDateString();
    this.feedRef = database.ref(
      `/feeds`
    );
    this.feedRef.off();
    const onReceive = data => {
      const feed = data.val();
      console.log('feed', feed);
      callback({
        _id: data.key,
        context: feed.context,
        // comments: feed.comments,
        likes: feed.likes,
        createdAt: new Date(feed.createdAt),
        userId: feed.userId,
        userName: feed.userName,
      });
    };
    const onChange = (data) => {
      const feed = data.val();
      console.log('likes', feed.likes);
      callback({
        _id: data.key,
        context: feed.context,
        // comments: feed.comments,
        likes: feed.likes,
        createdAt: new Date(feed.createdAt),
        userId: feed.userId,
        userName: feed.userName,
      });
    }
    this.feedRef.limitToLast(50).on('child_added', onReceive);
    this.feedRef.on('child_changed', onChange);
  }
  // send the feed to the Backend
  postFeed(feed) {
    console.log('post!')
    console.log("i am posting... ")
    // for (let i = 0; i < feed.length; i++) {
    // }
          this.feedRef.push({
        context: feed.context,
        userId: feed.userId,
        userName: feed.userName,
        // comments: feed[i].comments,
        likes: feed.likes,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
  }

  // postComment(key, comment) {
  //   for (let i = 0; i < comment.length; i++) {
  //     this.feedRef.child(key).update({
  //       comments: comment
  //     });
  //   }
  // }

  likePost(key) {
    // for (let i = 0; i < like.length; i++) {
      console.log('pressing LIKE')
      console.log(key)
      this.feedRef.child(key).child('likes')
        .transaction((likes) => (likes ||0) + 1)
    // }
  }

  // close the connection to the Backend
  closeChat() {
    if (this.feedRef) {
      this.feedRef.off();
    }
  }
}

export default new FeedBackEnd();

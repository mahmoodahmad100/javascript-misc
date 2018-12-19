// we should include "https://www.gstatic.com/firebasejs/5.5.7/firebase.js"

// details needed for the chat
var chat_id      = 5; // just random number ... in your application make sure that you have right data
var message_data = {sender_id:100, receiver_id:5, message:'hi', seen:0}; // fake data to show you just an example

// initializing firebase app
var next_key = 0;
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};
firebase.initializeApp(config);
var database = firebase.database();

// show the messages in the page
var messages_ref = database.ref('chat/' + chat_id);
messages_ref.once('value', function(snapshot) {
	if(snapshot.numChildren() == 0)
		next_key = 1;
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      // here we should append the data to the html document (into the chat area)
    });
});

// set the key for the next message when a new message sent
database.ref('chat/' + chat_id).on('child_added', function(data) {
	var last_key = data.key;
	next_key = parseInt(last_key) + 1;
});

// save the message when hitting "enter" or clicking on "send" button. example: save_message(message_data, next_key);
function save_message(data, key)
{
	database.ref('chat/' + chat_id + '/' + key).set({
		sender_id: data.sender_id,
		receiver_id: data.receiver_id,
		message: data.message,
		seen: data.seen
	});
}

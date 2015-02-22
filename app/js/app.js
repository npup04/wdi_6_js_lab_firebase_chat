'use strict';
var myDataRef = new Firebase('https://blistering-fire-1069.firebaseio.com/');

$('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
          var name = $('#nameInput').val();
          var text = $('#messageInput').val();
          //write a message to Firebase using the set() function
          // myDataRef.set('User ' + name + ' says ' + text);

          //OR change your code to write an object with text and name properties:
          // myDataRef.set({name: name, text: text});

          //OR use push() instead of set() so that your chat app can support a list of messages (rather than just one):
          myDataRef.push({name: name, text: text});

          $('#messageInput').val('');
        }
      });

  //have Firebase notify us when chat messages arrive: add a callback to the list of chat messages using the on() method.
  //The on() method takes two arguments: the event type and the callback function.
  //Use the 'child_added' event so that we are notified of the arrival of individual messages.
  myDataRef.on('child_added', function(snapshot) {
        //For each chat message, Firebase will call your callback with a snapshot containing the message's data.
        //Extract the message data from the snapshot by calling the val() function and assign it to a variable.
        var message = snapshot.val();

        //Now call the displayChatMessage() function to display the message
        displayChatMessage(message.name, message.text);
      });
      function displayChatMessage(name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      };

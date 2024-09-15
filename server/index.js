const express = require('express');
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();
const port = 3000;

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Send endpoint: Adds an entry to the Firestore database
app.post('/send', async (req, res) => {
  const { to, from, message } = req.body;

  if (!to || !from || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newEntry = {
    uuid: uuidv4(), // Generate unique ID
    to,
    from,
    message,
    createdAt: new Date().toISOString(),
  };

  try {
    // Add new entry to Firestore collection "messages"
    await db.collection('messages').add(newEntry);
    res.status(200).json({ success: true, message: 'Message sent successfully', data: newEntry });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
});

// Get endpoint: Retrieves messages for a specific username
app.get('/get/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Query Firestore collection "messages" where "to" or "from" matches the username
    const snapshot = await db
      .collection('messages')
      .where('to', '==', username)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ success: false, message: 'No messages found' });
    }

    // Collect messages from Firestore query result
    const messages = [];
    snapshot.forEach(doc => {
      messages.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error('Error getting messages:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve messages' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const socket = new WebSocket('wss://yourserver.com');

socket.onopen = () => {
  console.log('Connected to WebSocket');
};

const sendMessage = (message: string) => {
  const msg = JSON.stringify({ to: 'userB', from: 'userA', message, createdAt: new Date() });
  socket.send(msg);
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received message:', data.message);
  // Update your chat UI here
};
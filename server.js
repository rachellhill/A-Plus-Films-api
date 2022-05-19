const usersData = require('./data/users')

const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3001);
app.locals.title = 'A Plus Users';
app.locals.users = usersData;

app.get('/api/v1/users', (request, response) => {
  response.send(usersData);
});

app.get('/api/v1/users/:username', (request, response) => {
  const { username } = request.params;
  const user = app.locals.users.find(user => username === user.username)

  if (!user) {
    return response.sendStatus(404);
  }

  response.status(200).json(user)
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

# Deity-React

```
npm i
```

Create a config file, `src/config.js`, replacing the values with your own.

```js
export default {
  base: 'http://drupal-host-name',
  oauth: {
    grant_type: 'grant-type', // eslint-disable-line camelcase
    client_id: 'client-i', // eslint-disable-line camelcase
    client_secret: 'client-secret', // eslint-disable-line camelcase
    username: 'username',
    password: 'password',
    scope: 'scope'
  }
};
```

```
npm start
```

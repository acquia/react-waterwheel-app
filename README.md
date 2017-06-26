![Waterwheel Ecosystem](https://raw.githubusercontent.com/acquia/waterwheel-js/assets/waterwheel.png)

# React + Waterwheel.js + Drupal 8

A boilerplate React application powered by Drupal 8 and Waterwheel.js.

---

## Prerequisites

- Node.js
- Yarn
- Drupal 8.x
  - JSON API
  - Simple OAuth

## Installation

### JavaScript

Clone this repository.

```
yarn install
```

### Drupal

Clone or download Drupal 8.x, _this was tested with Drupal 8.4.x checked out from head_.

```
composer require drupal/jsonapi
composer require drupal/simple_oauth:2.0-rc2
```

Ensure that your `services.yml` file is loaded and that CORS is enabled.

```
cors.config:
  enabled: true
  # Specify allowed headers, like 'x-allowed-header'.
  allowedHeaders: ['*']
  # Specify allowed request methods, specify ['*'] to allow all possible ones.
  allowedMethods: ['*']
  # Configure requests allowed from specific origins.
  allowedOrigins: ['*']
  # Sets the Access-Control-Expose-Headers header.
  exposedHeaders: true
  # Sets the Access-Control-Max-Age header.
  maxAge: false
  # Sets the Access-Control-Allow-Credentials header.
  supportsCredentials: true
 ```

Visit `admin/config/people/simple_oauth` and ensure your OAuth settings are correct.

Vist `admin/config/people/simple_oauth/oauth2_client` and create a client for your React application.

Create a config file located at `src/config.js`, replacing the values with the ones you created earlier.

```js
export default {
  base: 'http://drupal-host-name',
  oauth: {
    grant_type: 'password',
    client_id: 'client-id',  // YOUR CLIENT ID
    client_secret: 'client-secret', // YOUR CLIENT SECRET
    username: 'username', // USERNAME
    password: 'password', // PASSWORD
    scope: 'administrator'
  }
};
```

## Running

```
yarn run start
```

Visit http://localhost:8080

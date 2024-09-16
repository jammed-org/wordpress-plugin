# Jammed plugin for Wordpress, dev instructions

Uses Docker Compose to run wordpress in a container, maps the ./plugin directory into Wordpress

## Installation

1. Download & install Docker
1. Run `docker compose up` & wait to finish
1. Visit `http://localhost:8080` and follow first time setup instructions
1. The plugin needs to be installed, but changes will reflect immediately

# Running the stack

1. `docker compose up`
1. `docker compose down`

## Development

- `install asdf`
- `asdf plugin-add nodejs`
- `asdf plugin-add pnpm`
- `cd plugin/jammed-booking-wp`
- `asdf install`
- Run `pnpm run build` to build your JavaScript file. This will create a build directory with the compiled index.js file.

## Checking plugin

- Install the WP CLI `brew install wp-cli`
- Run the plugin check via root directory `wp plugin check plugins/jammed-booking-wp`

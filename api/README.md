# Entera API

## Setup

From this project folder:

```sh
$ rbenv install 3.0.1
$ bundle install
```

## Run

The react client expects that the API is running on port 3001 during development.

```sh
$ rails s -p 3001
```

To run tests:

```sh
$ bundle exec rspec
```

To run specs in `./spec/acceptance` and generate HTML documentation for the endpoints in `./doc/api`:

```sh
$ rake docs:generate
# You can view the HTML output in api/doc/api/index.html
```
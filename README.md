# Discord Verification Bot

> A simple discord bot that helps you verify a user with a verification code.

## Requirements

Node - 16.6.1

NPM - 7.20.3

## Screenshots

<p align="center">
    <img src="https://i.imgur.com/spIKyXj.png" alt="Screenshot 1">
</p>

<p align="center">
    <img src="https://i.imgur.com/ceVU9LS.png" alt="Screenshot 2">
</p>

<p align="center">
    <img src="https://i.imgur.com/A6QAix0.png" alt="Screenshot 3">
</p>

<p align="center">
    <img src="https://i.imgur.com/G3YM6al.png" alt="Screenshot 4">
</p>

<p align="center">
    <img src="https://i.imgur.com/6wjmYz9.png" alt="Screenshot 5">
</p>

### Installation

1. Clone the repository

```shell
$ git clone https://github.com/NEEROL/discord-verification-bot.git
```

2. Enter into the directory

```shell
$ cd discord-verification-bot/
```

3. Install the dependencies

```shell
$ npm install
```

### Configuration

After cloning the project and installing all dependencies, you need to add your Discord API token, verification rule id and channel id in the .env file.
Create an .env file and copy the contents from .env.example to the .env file.

### Starting the application

```shell
$ npm start
```

### Commands

`send_msg`

-   Sends verification message (only works on the verification channel with MANAGE_GUILD privileges)

### License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](https://github.com/NEEROL/discord-verification-bot/blob/main/LICENSE) file for details

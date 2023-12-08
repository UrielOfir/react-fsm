# React Finite State Machine (FSM)

This repository contains a simple implementation of a Finite State Machine (FSM) in React. It simulates an elevator system with states such as `idle`, `moving`, and `gotToFloor`.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- yarn

### Installation

1. Clone the repository:
``` 
git clone https://github.com/yourusername/react-fsm.git 
```
2. Navigate into the project directory:
```
cd react-fsm
```
3. Install the dependencies:
```
yarn
```


### Running the Example

The `example` folder contains a backend service and a frontend service that demonstrate the use of the FSM as an elevator with a React app.

1. Navigate into the `example/backend` directory and install the dependencies:
```
cd example/backend yarn
```
2. Start the backend service:
```
yarn start
```
3. In a new terminal, navigate into the `example/frontend` directory and install the dependencies:
```
cd ../frontend yarn
```


The backend service runs on port 3001 as REST API and on port 8080 as web-socket.
The frontend service runs on port 3000.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
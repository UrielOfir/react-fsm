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


## Usage

The `FSM` class is used to create a finite state machine. Here's how to use it:

1. Import the `FSM` class:
```typescript
import FSM from './fsm';
```

2. Create a new instance of FSM, passing the initial state to the constructor:
```typescript
const fsm = new FSM('initialState');
```

3. Define states using the defineState method. You can optionally pass callbacks for when the FSM enters or exits the state:
```typescript
fsm.defineState('state1', () => console.log('Entered state1'), () => console.log('Exited state1'));
fsm.defineState('state2');
```
4. Define transitions between states using the defineTransition method. You can optionally pass an action to be performed during the transition:
```typescript
fsm.defineTransition('state1', 'state2', 'event1', () => console.log('Performing action...'));
```
5. Trigger transitions using the transition method:
```typescript
fsm.transition('event1');
```
6. Get the current state using the getState method:
```
console.log(fsm.getState()); // Outputs: 'state2'
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

## Project Roadmap

For more details on the future plans for this project, check out the [Project Roadmap](./ROADMAP.md).

The backend service runs on port 3001 as REST API and on port 8080 as web-socket.
The frontend service runs on port 3000.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
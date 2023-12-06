class FSM {
    private currentState: string;
    private transitions: Record<string, Record<string, { toState: string; action?: () => void }>>;
    private onEnterCallbacks: Record<string, () => void>;
    private onExitCallbacks: Record<string, () => void>;
  
    constructor(initialState: string) {
      this.currentState = initialState;
      this.transitions = {};
      this.onEnterCallbacks = {};
      this.onExitCallbacks = {};
    }
  
    defineState(state: string, onEnter?: () => void, onExit?: () => void): void {
      this.transitions[state] = {};
      this.onEnterCallbacks[state] = onEnter || (() => {});
      this.onExitCallbacks[state] = onExit || (() => {});
    }
  
    defineTransition(fromState: string, toState: string, event: string, action?: () => void): void {
      this.transitions[fromState][event] = { toState, action };
    }
  
    transition(event: string): void {
      const transition = this.transitions[this.currentState][event];
      if (transition) {
        this.onExitCallbacks[this.currentState]();
        this.currentState = transition.toState;
        this.onEnterCallbacks[this.currentState]();
        if (transition.action) {
          transition.action();
        }
      } else {
        console.error(`Invalid transition from state ${this.currentState} on event ${event}`);
      }
    }
  
    getState(): string {
      return this.currentState;
    }
  }
  
  export default FSM;
  
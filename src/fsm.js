class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(!config) throw new Error("Not configured");


        this._state  = config.initial;

        this._states = config.states;
        this._states[this._state].initial = true;
        this._history = [this._state];
        this._pointer = 0;
       // this._canRedo = false;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this._state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(state in this._states){
            this._state = state;
            this._history.push(state);
            this._pointer++;
          // this._canRedo = false;
        }
        else throw new Error("State is not found");
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {

        for (let a in this._states)
        {
            if(this._state == a)
                if(this._states[a].transitions.hasOwnProperty(event))
                {
                    this._state = this._states[a].transitions[event];
                    this._history.push(this._state);
                    this._pointer ++;
                    //this._canRedo = false;
                    return;
                }
        }


        throw new Error("Not found");
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {

        this._state = this._history[0];
       // this._canRedo = false;
        this._pointer=0;


    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let arr = [];
        if(!event) {
            for (let a in this._states) {
                arr.push(a);
            }
        }
        else {
            for (let a in this._states)
            {
                if(this._states[a].transitions.hasOwnProperty(event))
                {
                    arr.push(a);

                }
            }
        }
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

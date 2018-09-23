type Command = () => void;

export class RemoteControl {
    private onCommands: Command[] = [];
    private offCommands: Command[] = [];
    private undoCommands: Command[] = [];

    private lastCommand: Command[] = [];

    constructor() {
        for(let i = 0; i <7; i++) {
            this.onCommands[i] = () => {
                console.log(`No ON command on row ${0}`);
            };

            this.offCommands[i] = () => {
                console.log(`No OFF command on row ${0}`);
            };

            this.undoCommands[i] = () => {
                console.log(`No UNDO command on row ${0}`);
            };
        }
    }

    addCommand(row: number, onCommand: Command, offCommand: Command, undoCommand: Command) {
        this.onCommands[row] = onCommand;
        this.offCommands[row] = offCommand;
        this.undoCommands[row] = undoCommand;
    }

    clickOnButton(row: number) {
        const command = this.onCommands[row];
        command();
        this.lastCommand.push(this.undoCommands[row]);
    }

    clickOffButton(row: number) {
        const command = this.offCommands[row];
        command();
        this.lastCommand.push(this.undoCommands[row]);
    }

    undo() {
        const command = this.lastCommand.pop();
        if(command) {
            command();
        }

    }
}

export class TV {
    private _isOn = false;
    private lastState: boolean[] = [];

    turnOn() {
        this.lastState.push(this._isOn);
        this._isOn = true;
    }

    turnOff() {
        this.lastState.push(this._isOn);
        this._isOn = false;
    }

    isOn() {
        return this._isOn;
    }

    undo() {
        const state = this.lastState.pop();
        if(state !== undefined) {
            this._isOn = state;
        }
    }
}

export class Fan extends TV {

}
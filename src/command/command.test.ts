type Command = () => void;

class RemoteControl {
    private onCommands: Command[] = [];
    private offCommands: Command[] = [];
    private undoCommands: Command[] = [];

    private lastCommand: Command = () => null;

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
        this.lastCommand = this.undoCommands[row];
    }

    clickOffButton(row: number) {
        const command = this.offCommands[row];
        command();
        this.lastCommand = this.undoCommands[row];
    }

    undo() {
        this.lastCommand()
    }
}

class TV {
    private _isOn = false;
    turnOn() {
        this._isOn = true;
    }

    turnOff() {
        this._isOn = false;

    }

    isOn() {
        return this._isOn;
    }

    undo() {
        this._isOn = !this._isOn;
    }
}

class Fan extends TV {

}

describe('RemoteControl', () => {
    let tv: TV;
    let fan: Fan;
    let remote: RemoteControl;
    beforeEach(() => {
        tv = new TV();
        fan = new Fan();
        remote = new RemoteControl();
        remote.addCommand(0, tv.turnOn.bind(tv), tv.turnOff.bind(tv), tv.undo.bind(tv));
        remote.addCommand(1, fan.turnOn.bind(fan), fan.turnOff.bind(fan), fan.undo.bind(fan));
    });

    it('should turn on TV when clicking row 0 "ON" button', () => {
        remote.clickOnButton(0);
        expect(tv.isOn()).toBeTruthy();
    });

    it('should turn off TV when clicking row 0 "OFF" button', () => {
        remote.clickOffButton(0);
        expect(tv.isOn()).toBeFalsy();
    });

    it('should turn on the FAN when click row 1 "ON" button', () => {
        remote.clickOnButton(1);
        expect(fan.isOn()).toBeTruthy();
    });

    it('should turn off the FAN when click row 1 "OFF" button', () => {
        remote.clickOnButton(1);
        remote.clickOffButton(1);
        expect(fan.isOn()).toBeFalsy();
    });

    it('should undo the last action when UNDO button is clicked', () => {
        remote.clickOnButton(0);
        remote.clickOffButton(0)
        expect(tv.isOn()).toBeFalsy();
        remote.undo();
        expect(tv.isOn()).toBeTruthy();
    });

    it('should allow changing undoing multiple actions', () => {
        remote.clickOnButton(0);
        remote.clickOnButton(1);
        expect(fan.isOn()).toBeTruthy();
        remote.undo();
        expect(fan.isOn()).toBeFalsy();
        remote.undo();
        // the undos should be an array in the remote
        expect(tv.isOn()).toBeFalsy();
    });
});
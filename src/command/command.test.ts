import {Fan, RemoteControl, TV} from "./command";

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

    it('should allow undoing multiple actions', () => {
        // initially both are off
        expect(tv.isOn()).toBeFalsy();
        expect(fan.isOn()).toBeFalsy();

        remote.clickOnButton(1); // turn on fan
        remote.clickOnButton(0); // turn on tv
        remote.clickOffButton(1); // turn off fan
        remote.clickOffButton(1); // turn off fan again accidentally
        remote.clickOnButton(1); // turn on fan
        remote.clickOffButton(0); // turn off tv
        expect(tv.isOn()).toBeFalsy();
        expect(fan.isOn()).toBeTruthy();

        remote.undo();
        expect(tv.isOn()).toBeTruthy();
        expect(fan.isOn()).toBeTruthy();

        remote.undo();
        expect(fan.isOn()).toBeFalsy();
        expect(tv.isOn()).toBeTruthy();

        remote.undo();
        expect(fan.isOn()).toBeFalsy();
        expect(tv.isOn()).toBeTruthy();

        remote.undo();
        expect(fan.isOn()).toBeTruthy();
        expect(tv.isOn()).toBeTruthy();

        remote.undo();
        expect(fan.isOn()).toBeTruthy();
        expect(tv.isOn()).toBeFalsy();

        remote.undo();
        expect(fan.isOn()).toBeFalsy();
        expect(tv.isOn()).toBeFalsy();
    });
});
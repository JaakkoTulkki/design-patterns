interface Observer {
    update(obj: any): void;
}

interface Subject {
    subscribe(observer: Observer): void;
    unsubscribe(observer: Observer): void;
    notifyMembers(): void;
}

class WeatherData implements Subject {
    private subscribers: Observer[] = [];
    private data: any;
    subscribe(observer: Observer): void {
        this.subscribers.push(observer);
    }

    unsubscribe(observer: Observer): void {
        const ind = this.subscribers.indexOf(observer);
        this.subscribers.splice(ind, 1);
    }

    notifyMembers(): void {
        for(const observer of this.subscribers) {
            observer.update(this.data);
        }
    }

    setData(data: any) {
        this.data = data;
        this.notifyMembers();
    }
}

describe('WeatherData', () => {
    let weatherData: WeatherData;
    const data = {
            temperature: 100,
        };

    beforeEach(() => {
        weatherData = new WeatherData();
    });
    it('should notify observers', () => {
        const observer = {update: jest.fn()} as Observer;
        const observerTwo = {update: jest.fn()} as Observer;
        weatherData.subscribe(observer);
        weatherData.subscribe(observerTwo);

        weatherData.setData(data);
        expect(observer.update).toHaveBeenCalledWith(data);
        expect(observerTwo.update).toHaveBeenCalledWith(data);
    });

    it('should not call unsubscriber observers', () => {
        const observer = {update: jest.fn()} as Observer;
        const observerTwo = {update: jest.fn()} as Observer;
        weatherData.subscribe(observer);
        weatherData.subscribe(observerTwo);

        weatherData.unsubscribe(observer);

        weatherData.setData(data);
        expect(observerTwo.update).toHaveBeenCalled();
        expect(observer.update).not.toHaveBeenCalled();

    });
});
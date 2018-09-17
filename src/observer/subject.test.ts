import {Observer, WeatherData} from "./subject";

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

    it('should not call unsubscribed observers', () => {
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
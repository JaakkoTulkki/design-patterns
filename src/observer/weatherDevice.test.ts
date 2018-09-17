import {HumidityTerminal, TemperatureTerminal, WeatherDevice, WeatherService} from "./weatherDevice";
import {WeatherData} from "./subject";

describe('WeatherDevice', () => {
    let temperatuTerminal: TemperatureTerminal;
    let humidityTerminal: HumidityTerminal;
    let weatherData: WeatherData;

    beforeEach(() => {
        temperatuTerminal = new TemperatureTerminal();
        temperatuTerminal.setData({temperature: 90} as any);
        humidityTerminal = new HumidityTerminal();
        humidityTerminal.setData({humidity: 56} as any);
        let weatherService = {} as WeatherService;
        weatherService.getData = () => ({
            temperature: 12,
            humidity: 33,
        });

        weatherData = new WeatherData();
    });

    it('should query weather data from the WeatherService and set values in terminals', () => {
        const weatherService = {} as WeatherService;
        const getData = jest.fn();
        getData.mockReturnValueOnce({
            temperature: 12,
            humidity: 33,
        });
        weatherService.getData = getData;
        const weatherDevice = new WeatherDevice([temperatuTerminal, humidityTerminal], weatherService, weatherData);

        expect(weatherDevice.print()).toEqual('Temperature: 12C\nHumidity: 33%');
        expect(getData).toHaveBeenCalledTimes(1);
    });

    it('should get the weather data on refresh and update the screens', () => {
        const weatherService = {} as WeatherService;
        const getData = jest.fn();
        getData.mockReturnValueOnce({
            temperature: 12,
            humidity: 33,
        });
        getData.mockReturnValueOnce({
            temperature: 42,
            humidity: 55,
        });
        weatherService.getData = getData;
        const weatherDevice = new WeatherDevice([temperatuTerminal, humidityTerminal], weatherService, weatherData);
        expect(weatherDevice.print()).toEqual('Temperature: 12C\nHumidity: 33%');

        weatherDevice.refresh();

        expect(weatherDevice.print()).toEqual('Temperature: 42C\nHumidity: 55%');
        expect(getData).toHaveBeenCalledTimes(2);
    });
});
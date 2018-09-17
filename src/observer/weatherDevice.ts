import {Observer, WeatherData} from "./subject";

export class WeatherDevice {
    constructor(private terminals: Terminal[], private weatherService: WeatherService, private weatherData: WeatherData) {
        const data = weatherService.getData();
        terminals.forEach((terminal: Terminal) => {
            terminal.setData(data);
            weatherData.subscribe(terminal);
        });
    }

    public print() {
        return this.terminals.map(terminal => terminal.print()).join('\n');
    }

    public refresh() {
        const weatherReport: WeatherReport = this.weatherService.getData();
        this.weatherData.setData(weatherReport);
    }
}

export abstract class AbstractTerminal {
    protected value: WeatherReport;
    setData(value: WeatherReport): void {
        this.value = value;
    }
}

export  interface Terminal extends AbstractTerminal, Observer{
    print(): string;
}

export  class TemperatureTerminal extends AbstractTerminal implements Terminal {
    print(): string {
        return `Temperature: ${this.value.temperature}C`;
    }

    update(obj: any): void {
        this.value = obj;
        this.print();
    }
}

export class HumidityTerminal extends AbstractTerminal implements Terminal {
    print(): string {
        return `Humidity: ${this.value.humidity}%`;
    }

    update(obj: any): void {
        this.value = obj;
        this.print();
    }
}

export interface WeatherReport {
    temperature: number;
    humidity: number;
}

export interface WeatherService {
    getData(): WeatherReport;
}

export interface Observer {
    update(obj: any): void;
}

export interface Subject {
    subscribe(observer: Observer): void;
    unsubscribe(observer: Observer): void;
    notifyMembers(): void;
}

export class WeatherData implements Subject {
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
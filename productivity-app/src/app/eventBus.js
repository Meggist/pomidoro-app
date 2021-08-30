class EventBus {
    constructor() {
        this.eventCallbacksPairs = [];
    }

    subscribe(eventType, callback) {
        const eventCallbacksPair = this.findEventCallbacksPair(eventType);

        if (eventCallbacksPair) {
            eventCallbacksPair.callback = callback
        } else {
            this.eventCallbacksPairs.push(new EventCallbacksPair(eventType, callback));
        }
    }

    publish(eventType, args) {
        const eventCallbacksPair = this.findEventCallbacksPair(eventType);

        if (!eventCallbacksPair) {
            console.error("no subscribers for event " + eventType);
            return;
        }
        eventCallbacksPair.callback(args)
    }

    findEventCallbacksPair(eventType) {
        return this.eventCallbacksPairs.find(eventObject => eventObject.eventType === eventType);
    }
}

class EventCallbacksPair {
    constructor(eventType, callback) {
        this.eventType = eventType
        this.callback = callback
    }
}

export const eventBus = new EventBus();

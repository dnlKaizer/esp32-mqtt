import mqtt from 'mqtt';
import { MQTT } from '../config/mqtt';

class MqttService {
    private client: mqtt.MqttClient | null = null;

    connect(onConnect?: () => void, onError?: (err: Error) => void) {
        if (this.client && this.client.connected) {
            if (onConnect) onConnect();
            return;
        }

        this.client = mqtt.connect(MQTT.BROKER_URL);

        this.client.on('connect', () => {
            this.client?.subscribe(
                MQTT.TOPICS.map(topic => MQTT.TOPIC_PREFIX + topic),
                (err) => {if (err && onError) onError(err); }
            );
            if (onConnect) onConnect();
        });

        this.client.on('error', (err) => {
            if (onError) onError(err);
        });

        // this.client.on('close', () => {
        //     if (this.client && !this.client.connected) {
        //         if (onError) onError(new Error('Falha na conexão com o Broker'));
        //     }
        // });
    }

    onMessage(callback: (topic: string, message: string) => void) {
        if (!this.client) return;
        
        const handler = (topic: string, message: Buffer) => {
            callback(topic, message.toString());
        };

        this.client.on('message', handler);
    }

    disconnect() {
        if (this.client) {
            this.client.end(true); // O 'true' força o fechamento imediato
            this.client = null;
        }
    }
}

export const mqttService = new MqttService();
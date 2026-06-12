import mqtt from "mqtt";
import { MQTT } from "../config/mqtt";
import { useEffect, useState } from "react";

type GroupKey = typeof MQTT.TOPICS[number];

export function useMqtt() {
    const [trash, setTrash] = useState({
        grupo1: 0,
        grupo2: 0,
        grupo3: 0
    });

    useEffect(() => {
        const client = mqtt.connect(MQTT.BROKER_URL);

        client.on('connect', () => {
            console.log('Conectado ao Broker!');
            client.subscribe(MQTT.TOPICS.map(grupo => MQTT.TOPIC_PREFIX + grupo));
        });

        client.on('message', (topic, message) => {
            const value = message.toString();
            const segment = topic.split('/').pop();

            if (segment && MQTT.TOPICS.includes(segment as GroupKey)) {
                const grupo = segment as GroupKey;

                setTrash(prev => ({
                    ...prev,
                    [grupo]: value
                }));
            }
        });

        return () => { client.end(); };
    }, []);

    return { trash };
}
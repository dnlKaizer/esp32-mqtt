export const MQTT = {
    TOPIC_PREFIX: import.meta.env.VITE_MQTT_TOPIC_PREFIX,
    BROKER_URL: import.meta.env.VITE_MQTT_BROKER_URL,
    TOPICS: ['grupo1', 'grupo2', 'grupo3'] as const,
}
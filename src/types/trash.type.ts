import type { MQTT } from "../config/mqtt";

export type GroupKey = typeof MQTT.TOPICS[number];

export interface TrashData {
    id: number;
    value: number | null;
    percentage: number;
}

export interface TrashView {
    group: GroupKey; 
    value: string;
    percentage: number;
}
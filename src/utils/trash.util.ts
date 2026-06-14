import { MQTT } from "../config/mqtt";
import type { GroupKey, TrashData, TrashView } from "../types/trash.type";

export function formatTrashMessage(topic: string, message: string): TrashView | null {
    const segment = topic.split('/').pop();
    const isValidSegment = segment && MQTT.TOPICS.includes(segment as GroupKey);

    if (!isValidSegment) return null;

    let trash: TrashData;
    const id = Number(segment.replace('grupo', ''));

    try {
        trash = JSON.parse(message);

        if (!isTrashData(trash)) {
            const value = Number.parseFloat(message);
            if (Number.isNaN(value)) return null;
    
            trash = {
                id: id,
                value: null,
                percentage: value
            };
        } else {
            if (trash.id !== id) return null;
        }
    } catch (error) {
        console.error(`Failed to parse message for topic ${topic}:`, error);
        return null;
    }

    return formatTrashData(trash);
}

const isTrashData = (data: any): boolean => {
    return (
        typeof data === 'object' &&
        data !== null &&
        typeof data.id === 'number' &&
        typeof data.value === 'number' &&
        typeof data.percentage === 'number'
    );
}

const formatTrashData = (trash: TrashData): TrashView | null => {
    let { value, percentage } = trash;
    const group = getGroupById(trash.id);
    
    if (!group) return null;

    return {
        group: group,
        value: formatValue(value),
        percentage: formatPercentage(percentage)
    };
}

const formatValue = (value: number | null): string => {
    if (value === null) return '--';

    const valueString = Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 0, // Não força zeros se não precisar
        maximumFractionDigits: 2  // Limita a no máximo duas casas
    }).format(value);

    return valueString;
}

const formatPercentage = (percentage: number): number => {
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    return percentage;
}

const getGroupById = (id: number): GroupKey | null => {
    if (id < 1 || id > MQTT.TOPICS.length || Number.isInteger(id) === false) {
        console.error(`Invalid group ID: ${id}`);
        return null;
    }
    return MQTT.TOPICS[id - 1];
}
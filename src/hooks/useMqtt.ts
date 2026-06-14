import { useEffect, useState } from 'react';
import { mqttService } from '../services/mqtt.service';
import type { TrashView } from '../types/trash.type';
import { formatTrashMessage } from '../utils/trash.util';

export function useMqtt() {
    const [trash, setTrash] = useState<TrashView[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        mqttService.connect(
            () => {
                setLoading(false);
                setError(null);
            },
            (err) => {
                setError(err.message);
                setLoading(false);
            }
        );

        mqttService.onMessage((topic, message) => {
            const view = formatTrashMessage(topic, message);
            if (view) {
                setTrash(prev => {
                    const exists = prev.some(t => t.group === view.group);
                    if (exists) {
                        return prev.map(t => t.group === view.group ? view : t);
                    }
                    return [...prev, view].sort((a, b) => a.group.localeCompare(b.group));
                });
            } else {
                console.warn(`Mensagem ${topic} não pode ser formatada.`);
            }
        });

        return () => {
            mqttService.disconnect();
        };
    }, []);

    return { trash, loading, error };
}
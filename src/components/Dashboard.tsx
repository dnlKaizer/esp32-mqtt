import { useMqtt } from "../hooks/useMqtt";

export function Dashboard() {
    const { trash } = useMqtt();

    return (
        <div>
            <h1>Status das trash</h1>
            <p>Grupo 1: {trash.grupo1} cm</p>
            <p>Grupo 2: {trash.grupo2} cm</p>
            <p>Grupo 3: {trash.grupo3} cm</p>
        </div>
    );
}
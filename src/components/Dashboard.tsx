import { useMqtt } from "../hooks/useMqtt";
import { TrashCard } from "./TrashCard";

export function Dashboard() {
    const { trash, loading, error } = useMqtt();

    return (
        <main style={styles.root}>
            <header style={styles.header}>
                <h1 style={styles.title}>Monitoramento de lixeiras</h1>
                <p style={styles.subtitle}>Nível de preenchimento em tempo real via MQTT</p>
            </header>

            {loading && (
                <div style={styles.stateBox}>
                    <span style={styles.spinner} aria-hidden="true" />
                    <span style={styles.stateText}>Conectando ao broker MQTT...</span>
                </div>
            )}

            {error && !loading && (
                <div style={styles.errorBox} role="alert">
                    <span style={styles.errorText}>
                        Falha ao conectar:{" "}
                        {error}
                    </span>
                </div>
            )}

            {!loading && !error && trash.length === 0 && (
                <div style={styles.emptyBox}>
                    <p style={styles.stateText}>Nenhum dado recebido ainda.</p>
                </div>
            )}

            {!loading && !error && trash.length > 0 && (
                <div style={styles.grid}>
                    {trash.map((item) => (
                        <TrashCard key={item.group} item={item} />
                    ))}
                </div>
            )}
        </main>
    );
}

const styles = {
    root: {
        minHeight: "100dvh",
        width: "100%",
        padding: "1.5rem",
        boxSizing: "border-box" as const,
        fontFamily: "system-ui, -apple-system, sans-serif",
        backgroundColor: "var(--color-bg, #f8f8f7)",
        color: "var(--color-text, #1a1a1a)",
    },
    header: {
        marginBottom: "1.5rem",
    },
    title: {
        fontSize: "clamp(18px, 4vw, 24px)",
        fontWeight: 700,
        margin: "0 0 4px",
        color: "inherit",
        textAlign: "center",
    },
    subtitle: {
        fontSize: "14px",
        margin: 0,
        color: "#6b6b6a",
        textAlign: "center",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "12px",
    },
    stateBox: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "2rem",
    },
    stateText: {
        fontSize: "14px",
        color: "#6b6b6a",
    },
    spinner: {
        display: "inline-block",
        width: "16px",
        height: "16px",
        border: "2px solid #d3d1c7",
        borderTopColor: "#5f5e5a",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
    },
    errorBox: {
        padding: "0.75rem 1rem",
        background: "#fcebeb",
        borderRadius: "8px",
        border: "0.5px solid #f09595",
    },
    errorText: {
        fontSize: "14px",
        color: "#a32d2d",
    },
    emptyBox: {
        padding: "2rem",
        textAlign: "center" as const,
        border: "0.5px dashed rgba(0,0,0,0.15)",
        borderRadius: "12px",
    }
} as const;
import type { TrashView } from "../types/trash.type";

function getLevel(percentage: number): "low" | "mid" | "high" {
    if (percentage < 50) return "low";
    if (percentage < 80) return "mid";
    return "high";
}

function getLevelLabel(percentage: number): string {
    if (percentage < 30) return "Baixo";
    if (percentage < 50) return "Normal";
    if (percentage < 80) return "Médio";
    return "Alto";
}

function formatGroupName(key: string): string {
    return key.replace(/grupo(\d+)/i, "Grupo $1");
}

interface TrashCardProps {
    item: TrashView;
}

export function TrashCard({ item }: TrashCardProps) {
    const level = getLevel(item.percentage);
    const label = getLevelLabel(item.percentage);
    const numericValue = item.value.trim();

    return (
        <article style={styles.card}>
            <div style={styles.cardHeader}>
                <span style={styles.groupLabel}>{formatGroupName(item.group)}</span>
                <span style={{ ...styles.badge, ...styles.badgeVariants[level] }}>
                    {label}
                </span>
            </div>

            <p style={styles.valueRow}>
                <span style={styles.valueNumber}>{numericValue}</span>
                <span style={styles.valueUnit}>cm</span>
            </p>

            <div style={styles.barRow}>
                <div style={styles.barTrack}>
                    <div
                        style={{
                            ...styles.barFill,
                            ...styles.barFillVariants[level],
                            width: `${item.percentage}%`,
                        }}
                        role="progressbar"
                        aria-valuenow={item.percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${formatGroupName(item.group)}: ${item.percentage}% de preenchimento`}
                    />
                </div>
                <span style={styles.barPercent}>{item.percentage}%</span>
            </div>
        </article>
    );
}

const styles = {
    card: {
        background: "#fff",
        border: "0.5px solid rgba(0,0,0,0.12)",
        borderRadius: "12px",
        padding: "1rem 1.25rem",
    },
    cardHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "12px",
    },
    groupLabel: {
        fontSize: "12px",
        fontWeight: 500,
        letterSpacing: "0.06em",
        textTransform: "uppercase" as const,
        color: "#6b6b6a",
    },
    badge: {
        fontSize: "11px",
        fontWeight: 500,
        padding: "2px 8px",
        borderRadius: "100px",
    },
    badgeVariants: {
        low: { background: "#e1f5ee", color: "#0f6e56" },
        mid: { background: "#faeeda", color: "#854f0b" },
        high: { background: "#fcebeb", color: "#a32d2d" },
    },
    valueRow: {
        margin: "0 0 14px",
        lineHeight: 1,
    },
    valueNumber: {
        fontSize: "28px",
        fontWeight: 500,
        color: "inherit",
    },
    valueUnit: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#6b6b6a",
        marginLeft: "2px",
    },
    barRow: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    barTrack: {
        flex: 1,
        height: "8px",
        background: "#ebebea",
        borderRadius: "100px",
        overflow: "hidden",
    },
    barFill: {
        height: "100%",
        borderRadius: "100px",
        transition: "width 0.5s ease",
    },
    barFillVariants: {
        low: { background: "#1D9E75" },
        mid: { background: "#BA7517" },
        high: { background: "#E24B4A" },
    },
    barPercent: {
        fontSize: "13px",
        fontWeight: 500,
        color: "#6b6b6a",
        minWidth: "34px",
        textAlign: "right" as const,
    }
} as const;
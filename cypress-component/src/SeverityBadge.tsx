export type Severity = 'critical' | 'high' | 'medium' | 'low';

export const SEVERITIES: readonly Severity[] = ['critical', 'high', 'medium', 'low'];

const LABELS: Record<Severity, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

/** A small, colored label. The text carries the meaning; color is only a second cue. */
export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span className={`badge badge--${severity}`} data-severity={severity} aria-label={`Severity: ${LABELS[severity]}`}>
      {LABELS[severity]}
    </span>
  );
}

export function severityLabel(severity: Severity): string {
  return LABELS[severity];
}

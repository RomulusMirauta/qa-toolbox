import { useId, useState, type FormEvent } from 'react';
import { SEVERITIES, SeverityBadge, severityLabel, type Severity } from './SeverityBadge';

export type BugReport = {
  title: string;
  steps: string;
  severity: Severity;
};

type Errors = Partial<Record<keyof BugReport, string>>;

export const TITLE_MIN = 8;
export const TITLE_MAX = 120;

export function validate(report: { title: string; steps: string; severity: string }): Errors {
  const errors: Errors = {};
  const title = report.title.trim();
  if (!title) errors.title = 'Title is required.';
  else if (title.length < TITLE_MIN) errors.title = `Title needs at least ${TITLE_MIN} characters.`;
  else if (title.length > TITLE_MAX) errors.title = `Title can have at most ${TITLE_MAX} characters.`;
  if (!report.steps.trim()) errors.steps = 'Steps to reproduce are required.';
  if (!SEVERITIES.includes(report.severity as Severity)) errors.severity = 'Choose a severity.';
  return errors;
}

/**
 * A bug-report form: validates on submit, moves focus to the first invalid field,
 * and hands a trimmed report to `onSubmit` only when everything is valid.
 */
export function BugReportForm({ onSubmit }: { onSubmit: (report: BugReport) => void }) {
  const id = useId();
  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState('');
  const [severity, setSeverity] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<BugReport | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate({ title, steps, severity });
    setErrors(found);
    const first = (['title', 'steps', 'severity'] as const).find((field) => found[field]);
    if (first) {
      document.getElementById(`${id}-${first}`)?.focus();
      setSubmitted(null);
      return;
    }
    const report: BugReport = { title: title.trim(), steps: steps.trim(), severity: severity as Severity };
    onSubmit(report);
    setSubmitted(report);
    setTitle('');
    setSteps('');
    setSeverity('');
  }

  const field = (name: keyof BugReport) => ({
    id: `${id}-${name}`,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${id}-${name}-error` : undefined,
  });

  const error = (name: keyof BugReport) =>
    errors[name] ? (
      <p className="error" id={`${id}-${name}-error`}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form className="bug-form" aria-labelledby={`${id}-heading`} noValidate onSubmit={handleSubmit}>
      <h2 id={`${id}-heading`}>Report a bug</h2>

      <label htmlFor={`${id}-title`}>Title</label>
      <input {...field('title')} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      {error('title')}

      <label htmlFor={`${id}-steps`}>Steps to reproduce</label>
      <textarea {...field('steps')} rows={4} value={steps} onChange={(e) => setSteps(e.target.value)} />
      {error('steps')}

      <label htmlFor={`${id}-severity`}>Severity</label>
      <select {...field('severity')} value={severity} onChange={(e) => setSeverity(e.target.value)}>
        <option value="">Choose…</option>
        {SEVERITIES.map((s) => (
          <option key={s} value={s}>
            {severityLabel(s)}
          </option>
        ))}
      </select>
      {error('severity')}
      {SEVERITIES.includes(severity as Severity) ? (
        <p className="preview">
          Preview: <SeverityBadge severity={severity as Severity} />
        </p>
      ) : null}

      <button type="submit">Submit report</button>

      <p role="status" className="status">
        {submitted ? `Report "${submitted.title}" submitted.` : ''}
      </p>
    </form>
  );
}

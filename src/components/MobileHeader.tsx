import { useCVStore, TOTAL_STEPS } from '../store/cvStore';

const stepLabels = [
  'Personlige Oplysninger',
  'Erhvervserfaring',
  'Uddannelse',
  'Kompetencer & Sprog',
  'Forhåndsvisning',
];

export function MobileHeader() {
  const { currentStep } = useCVStore();

  return (
    <header className="lg:hidden sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-bold" style={{ color: 'var(--color-foreground)' }}>CV Wizard</h1>
          <span className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
            Trin {currentStep + 1}/{TOTAL_STEPS}
          </span>
        </div>
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-primary)' }}>
          {stepLabels[currentStep]}
        </p>
        <div className="flex gap-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i <= currentStep ? 'var(--color-primary)' : 'var(--color-border)',
              }}
            />
          ))}
        </div>
      </div>
    </header>
  );
}

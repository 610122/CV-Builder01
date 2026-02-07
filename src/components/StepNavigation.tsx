import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCVStore, TOTAL_STEPS } from '../store/cvStore';

export function StepNavigation() {
  const { currentStep, nextStep, prevStep } = useCVStore();
  const isFirst = currentStep === 0;
  const isLast = currentStep === TOTAL_STEPS - 1;

  return (
    <div className="flex items-center justify-between pt-6 mt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
      <button
        onClick={prevStep}
        disabled={isFirst}
        className={`btn-secondary ${isFirst ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        <ChevronLeft size={16} />
        Tilbage
      </button>
      {!isLast && (
        <button onClick={nextStep} className="btn-primary">
          Fortsæt
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}

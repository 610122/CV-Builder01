import { User, Briefcase, GraduationCap, Wrench, Eye, Check } from 'lucide-react';
import { useCVStore, TOTAL_STEPS } from '../store/cvStore';

const steps = [
  { icon: User, label: 'Personlige Oplysninger' },
  { icon: Briefcase, label: 'Erhvervserfaring' },
  { icon: GraduationCap, label: 'Uddannelse' },
  { icon: Wrench, label: 'Kompetencer & Sprog' },
  { icon: Eye, label: 'Forhåndsvisning' },
];

export function Sidebar() {
  const { currentStep, setStep } = useCVStore();

  return (
    <aside
      className="hidden lg:flex flex-col w-72 min-h-screen py-8 px-6"
      style={{ backgroundColor: 'var(--color-sidebar)' }}
    >
      <div className="mb-10">
        <h1 className="text-xl font-bold text-white tracking-tight">
          CV Wizard
        </h1>
        <p className="text-xs mt-1" style={{ color: 'var(--color-sidebar-text)' }}>
          Opret dit professionelle CV
        </p>
      </div>

      <nav className="flex-1">
        <ol className="flex flex-col gap-1">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isComplete = index < currentStep;
            const isClickable = index <= currentStep;

            return (
              <li key={index}>
                <button
                  onClick={() => isClickable && setStep(index)}
                  className={`
                    w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all
                    ${isClickable ? 'cursor-pointer' : 'cursor-default opacity-50'}
                    ${isActive ? 'text-white' : ''}
                  `}
                  style={{
                    backgroundColor: isActive ? 'rgba(13, 148, 136, 0.15)' : 'transparent',
                    color: isActive
                      ? '#5eead4'
                      : isComplete
                      ? 'var(--color-sidebar-active)'
                      : 'var(--color-sidebar-text)',
                  }}
                  disabled={!isClickable}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold shrink-0"
                    style={{
                      backgroundColor: isActive
                        ? 'var(--color-primary)'
                        : isComplete
                        ? 'rgba(13, 148, 136, 0.3)'
                        : 'rgba(148, 163, 184, 0.15)',
                      color: isActive || isComplete ? '#ffffff' : 'var(--color-sidebar-text)',
                    }}
                  >
                    {isComplete ? <Check size={14} /> : <Icon size={14} />}
                  </span>
                  <span>{step.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div
        className="mt-auto pt-6 border-t"
        style={{ borderColor: 'rgba(148, 163, 184, 0.15)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-full rounded-full h-1.5"
            style={{ backgroundColor: 'rgba(148, 163, 184, 0.15)' }}
          >
            <div
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%`,
                backgroundColor: 'var(--color-primary)',
              }}
            />
          </div>
        </div>
        <p className="text-xs" style={{ color: 'var(--color-sidebar-text)' }}>
          Trin {currentStep + 1} af {TOTAL_STEPS}
        </p>
      </div>
    </aside>
  );
}

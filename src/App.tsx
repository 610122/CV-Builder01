import { Sidebar } from './components/Sidebar';
import { MobileHeader } from './components/MobileHeader';
import { PersonalInfoStep } from './components/steps/PersonalInfoStep';
import { ExperienceStep } from './components/steps/ExperienceStep';
import { EducationStep } from './components/steps/EducationStep';
import { SkillsStep } from './components/steps/SkillsStep';
import { PreviewStep } from './components/steps/PreviewStep';
import { useCVStore } from './store/cvStore';

const stepComponents = [
  PersonalInfoStep,
  ExperienceStep,
  EducationStep,
  SkillsStep,
  PreviewStep,
];

export default function App() {
  const { currentStep } = useCVStore();
  const StepComponent = stepComponents[currentStep];

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <MobileHeader />
        <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StepComponent />
        </main>
      </div>
    </div>
  );
}

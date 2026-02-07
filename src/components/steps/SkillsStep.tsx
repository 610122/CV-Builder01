import { Plus, Trash2 } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { StepNavigation } from '../StepNavigation';

const LANGUAGE_LEVELS = [
  'Begynder',
  'Grundlæggende',
  'Mellem',
  'Avanceret',
  'Flydende',
  'Modersmål',
];

export function SkillsStep() {
  const {
    data,
    addSkill,
    updateSkill,
    removeSkill,
    addLanguage,
    updateLanguage,
    removeLanguage,
  } = useCVStore();
  const { skills, languages } = data;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
          Kompetencer & Sprog
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
          Tilf&oslash;j dine f&aelig;rdigheder og sprogkundskaber.
        </p>
      </div>

      {/* Skills Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-foreground)' }}>
          Kompetencer
        </h3>
        <div className="flex flex-col gap-3">
          {skills.map((skill) => (
            <div key={skill.id} className="card flex items-center gap-4 py-3 px-4">
              <input
                type="text"
                className="form-input flex-1"
                placeholder="F.eks. JavaScript, Projektledelse..."
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
              />
              <div className="flex items-center gap-1 shrink-0">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => updateSkill(skill.id, { level })}
                    className="w-6 h-6 rounded-full border-2 transition-all"
                    style={{
                      backgroundColor:
                        level <= skill.level ? 'var(--color-primary)' : 'transparent',
                      borderColor:
                        level <= skill.level ? 'var(--color-primary)' : 'var(--color-border)',
                    }}
                    aria-label={`Niveau ${level}`}
                  />
                ))}
              </div>
              <button
                onClick={() => removeSkill(skill.id)}
                className="text-sm transition-colors shrink-0"
                style={{ color: 'var(--color-danger)' }}
                aria-label="Fjern kompetence"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={addSkill}
            className="btn-secondary w-full justify-center py-3 border-dashed"
          >
            <Plus size={16} />
            Tilf&oslash;j Kompetence
          </button>
        </div>
      </div>

      {/* Languages Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-foreground)' }}>
          Sprog
        </h3>
        <div className="flex flex-col gap-3">
          {languages.map((lang) => (
            <div key={lang.id} className="card flex items-center gap-4 py-3 px-4">
              <input
                type="text"
                className="form-input flex-1"
                placeholder="F.eks. Dansk, Engelsk..."
                value={lang.name}
                onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
              />
              <select
                className="form-input w-40 shrink-0"
                value={lang.level}
                onChange={(e) => updateLanguage(lang.id, { level: e.target.value })}
              >
                {LANGUAGE_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeLanguage(lang.id)}
                className="text-sm transition-colors shrink-0"
                style={{ color: 'var(--color-danger)' }}
                aria-label="Fjern sprog"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={addLanguage}
            className="btn-secondary w-full justify-center py-3 border-dashed"
          >
            <Plus size={16} />
            Tilf&oslash;j Sprog
          </button>
        </div>
      </div>

      <StepNavigation />
    </div>
  );
}

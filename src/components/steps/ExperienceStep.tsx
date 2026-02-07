import { Plus, Trash2 } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { StepNavigation } from '../StepNavigation';

export function ExperienceStep() {
  const { data, addExperience, updateExperience, removeExperience } = useCVStore();
  const { experiences } = data;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
          Erhvervserfaring
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
          Tilf&oslash;j dine tidligere og nuv&aelig;rende stillinger.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="card relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
                Stilling {index + 1}
              </h3>
              <button
                onClick={() => removeExperience(exp.id)}
                className="btn-danger"
                aria-label="Fjern stilling"
              >
                <Trash2 size={12} />
                Fjern
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Virksomhed *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="F.eks. Novo Nordisk"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Stilling *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="F.eks. Senior Udvikler"
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Startdato</label>
                  <input
                    type="month"
                    className="form-input"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Slutdato</label>
                  <input
                    type="month"
                    className="form-input"
                    value={exp.endDate}
                    disabled={exp.current}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                  />
                  <label className="flex items-center gap-2 mt-2 text-sm cursor-pointer" style={{ color: 'var(--color-muted)' }}>
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) =>
                        updateExperience(exp.id, { current: e.target.checked, endDate: '' })
                      }
                      className="rounded"
                      style={{ accentColor: 'var(--color-primary)' }}
                    />
                    Nuv&aelig;rende stilling
                  </label>
                </div>
              </div>

              <div>
                <label className="form-label">Beskrivelse</label>
                <textarea
                  className="form-textarea"
                  placeholder="Beskriv dine ansvarsområder og resultater..."
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addExperience}
          className="btn-secondary w-full justify-center py-4 border-dashed"
        >
          <Plus size={16} />
          Tilf&oslash;j Erhvervserfaring
        </button>
      </div>

      <StepNavigation />
    </div>
  );
}

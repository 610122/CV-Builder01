import { Plus, Trash2 } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { StepNavigation } from '../StepNavigation';

export function EducationStep() {
  const { data, addEducation, updateEducation, removeEducation } = useCVStore();
  const { educations } = data;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
          Uddannelse
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
          Tilf&oslash;j dine uddannelser og kurser.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {educations.map((edu, index) => (
          <div key={edu.id} className="card relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
                Uddannelse {index + 1}
              </h3>
              <button
                onClick={() => removeEducation(edu.id)}
                className="btn-danger"
                aria-label="Fjern uddannelse"
              >
                <Trash2 size={12} />
                Fjern
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Uddannelsessted *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="F.eks. K&oslash;benhavns Universitet"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Grad / Type</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="F.eks. Kandidat"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Studieretning</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="F.eks. Datalogi"
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Startdato</label>
                  <input
                    type="month"
                    className="form-input"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Slutdato</label>
                  <input
                    type="month"
                    className="form-input"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Beskrivelse</label>
                <textarea
                  className="form-textarea"
                  placeholder="Relevant information om uddannelsen..."
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addEducation}
          className="btn-secondary w-full justify-center py-4 border-dashed"
        >
          <Plus size={16} />
          Tilf&oslash;j Uddannelse
        </button>
      </div>

      <StepNavigation />
    </div>
  );
}

import { useCVStore } from '../../store/cvStore';
import { StepNavigation } from '../StepNavigation';
import { Camera } from 'lucide-react';
import { useRef } from 'react';

export function PersonalInfoStep() {
  const { data, updatePersonalInfo } = useCVStore();
  const { personalInfo } = data;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
          Personlige Oplysninger
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
          Udfyld dine kontaktoplysninger og en kort profiltekst.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Photo Upload */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="relative flex items-center justify-center w-20 h-20 rounded-full overflow-hidden border-2 border-dashed transition-colors"
            style={{ borderColor: 'var(--color-border)' }}
            aria-label="Upload profilbillede"
          >
            {personalInfo.photo ? (
              <img
                src={personalInfo.photo}
                alt="Profilbillede"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera size={24} style={{ color: 'var(--color-muted)' }} />
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
              Profilbillede
            </p>
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
              Valgfrit - Klik for at uploade
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label" htmlFor="fullName">Fulde Navn *</label>
            <input
              id="fullName"
              type="text"
              className="form-input"
              placeholder="F.eks. Anders Jensen"
              value={personalInfo.fullName}
              onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="jobTitle">Jobtitel</label>
            <input
              id="jobTitle"
              type="text"
              className="form-input"
              placeholder="F.eks. Software Udvikler"
              value={personalInfo.jobTitle}
              onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label" htmlFor="email">E-mail *</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="anders@eksempel.dk"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="phone">Telefon</label>
            <input
              id="phone"
              type="tel"
              className="form-input"
              placeholder="+45 12 34 56 78"
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label" htmlFor="address">Adresse</label>
            <input
              id="address"
              type="text"
              className="form-input"
              placeholder="F.eks. København, Danmark"
              value={personalInfo.address}
              onChange={(e) => updatePersonalInfo({ address: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="linkedin">LinkedIn</label>
            <input
              id="linkedin"
              type="url"
              className="form-input"
              placeholder="linkedin.com/in/dit-profil"
              value={personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="form-label" htmlFor="website">Hjemmeside</label>
          <input
            id="website"
            type="url"
            className="form-input"
            placeholder="https://din-hjemmeside.dk"
            value={personalInfo.website}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
          />
        </div>

        <div>
          <label className="form-label" htmlFor="summary">Profiltekst</label>
          <textarea
            id="summary"
            className="form-textarea"
            placeholder="Skriv en kort beskrivelse af din profil, dine styrker og karrieremål..."
            value={personalInfo.summary}
            onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
            rows={4}
          />
        </div>
      </div>

      <StepNavigation />
    </div>
  );
}

import { Download, Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { StepNavigation } from '../StepNavigation';
import { useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun',
    'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec',
  ];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export function PreviewStep() {
  const { data } = useCVStore();
  const { personalInfo, experiences, educations, skills, languages } = data;
  const cvRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = useCallback(async () => {
    if (!cvRef.current) return;

    const canvas = await html2canvas(cvRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;

    pdf.addImage(imgData, 'PNG', imgX, 0, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`${personalInfo.fullName || 'CV'}.pdf`);
  }, [personalInfo.fullName]);

  const hasContent =
    personalInfo.fullName ||
    experiences.length > 0 ||
    educations.length > 0 ||
    skills.length > 0;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
            Forh&aring;ndsvisning
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
            Gennemse dit CV og download det som PDF.
          </p>
        </div>
        {hasContent && (
          <button onClick={handleDownloadPDF} className="btn-primary shrink-0">
            <Download size={16} />
            Download PDF
          </button>
        )}
      </div>

      {!hasContent ? (
        <div
          className="card flex flex-col items-center justify-center py-16 text-center"
        >
          <p className="text-lg font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>
            Dit CV er tomt
          </p>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            G&aring; tilbage og udfyld dine oplysninger for at se en forh&aring;ndsvisning.
          </p>
        </div>
      ) : (
        <div className="overflow-auto rounded-xl border" style={{ borderColor: 'var(--color-border)' }}>
          <div
            ref={cvRef}
            className="bg-white mx-auto"
            style={{
              width: '210mm',
              minHeight: '297mm',
              fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
              color: '#1e293b',
            }}
          >
            {/* CV Header */}
            <div
              className="flex items-start gap-6 p-8 pb-6"
              style={{ backgroundColor: '#0f172a', color: '#ffffff' }}
            >
              {personalInfo.photo && (
                <img
                  src={personalInfo.photo}
                  alt=""
                  className="w-20 h-20 rounded-full object-cover border-2 shrink-0"
                  style={{ borderColor: '#0d9488' }}
                  crossOrigin="anonymous"
                />
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold tracking-tight">
                  {personalInfo.fullName || 'Dit Navn'}
                </h1>
                {personalInfo.jobTitle && (
                  <p className="text-base mt-1" style={{ color: '#5eead4' }}>
                    {personalInfo.jobTitle}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs" style={{ color: '#94a3b8' }}>
                  {personalInfo.email && (
                    <span className="flex items-center gap-1">
                      <Mail size={12} /> {personalInfo.email}
                    </span>
                  )}
                  {personalInfo.phone && (
                    <span className="flex items-center gap-1">
                      <Phone size={12} /> {personalInfo.phone}
                    </span>
                  )}
                  {personalInfo.address && (
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {personalInfo.address}
                    </span>
                  )}
                  {personalInfo.linkedin && (
                    <span className="flex items-center gap-1">
                      <Linkedin size={12} /> {personalInfo.linkedin}
                    </span>
                  )}
                  {personalInfo.website && (
                    <span className="flex items-center gap-1">
                      <Globe size={12} /> {personalInfo.website}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-8 pt-6 flex flex-col gap-6">
              {/* Summary */}
              {personalInfo.summary && (
                <section>
                  <h2
                    className="text-sm font-bold uppercase tracking-wider pb-2 mb-3 border-b"
                    style={{ color: '#0d9488', borderColor: '#e2e8f0' }}
                  >
                    Profil
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                    {personalInfo.summary}
                  </p>
                </section>
              )}

              {/* Experience */}
              {experiences.length > 0 && (
                <section>
                  <h2
                    className="text-sm font-bold uppercase tracking-wider pb-2 mb-3 border-b"
                    style={{ color: '#0d9488', borderColor: '#e2e8f0' }}
                  >
                    Erhvervserfaring
                  </h2>
                  <div className="flex flex-col gap-4">
                    {experiences.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-sm font-semibold" style={{ color: '#1e293b' }}>
                              {exp.position || 'Stilling'}
                            </h3>
                            <p className="text-sm" style={{ color: '#0d9488' }}>
                              {exp.company}
                            </p>
                          </div>
                          <span className="text-xs shrink-0" style={{ color: '#94a3b8' }}>
                            {formatDate(exp.startDate)}
                            {' - '}
                            {exp.current ? 'Nu' : formatDate(exp.endDate)}
                          </span>
                        </div>
                        {exp.description && (
                          <p className="text-xs mt-1.5 leading-relaxed whitespace-pre-line" style={{ color: '#475569' }}>
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {educations.length > 0 && (
                <section>
                  <h2
                    className="text-sm font-bold uppercase tracking-wider pb-2 mb-3 border-b"
                    style={{ color: '#0d9488', borderColor: '#e2e8f0' }}
                  >
                    Uddannelse
                  </h2>
                  <div className="flex flex-col gap-4">
                    {educations.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-sm font-semibold" style={{ color: '#1e293b' }}>
                              {edu.degree} {edu.field && `i ${edu.field}`}
                            </h3>
                            <p className="text-sm" style={{ color: '#0d9488' }}>
                              {edu.institution}
                            </p>
                          </div>
                          <span className="text-xs shrink-0" style={{ color: '#94a3b8' }}>
                            {formatDate(edu.startDate)}
                            {edu.endDate && ` - ${formatDate(edu.endDate)}`}
                          </span>
                        </div>
                        {edu.description && (
                          <p className="text-xs mt-1.5 leading-relaxed whitespace-pre-line" style={{ color: '#475569' }}>
                            {edu.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Skills & Languages row */}
              <div className="grid grid-cols-2 gap-8">
                {/* Skills */}
                {skills.length > 0 && (
                  <section>
                    <h2
                      className="text-sm font-bold uppercase tracking-wider pb-2 mb-3 border-b"
                      style={{ color: '#0d9488', borderColor: '#e2e8f0' }}
                    >
                      Kompetencer
                    </h2>
                    <div className="flex flex-col gap-2">
                      {skills.map((skill) => (
                        <div key={skill.id} className="flex items-center gap-3">
                          <span className="text-xs flex-1" style={{ color: '#1e293b' }}>
                            {skill.name || 'Kompetence'}
                          </span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className="w-2.5 h-2.5 rounded-full"
                                style={{
                                  backgroundColor:
                                    level <= skill.level ? '#0d9488' : '#e2e8f0',
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Languages */}
                {languages.length > 0 && (
                  <section>
                    <h2
                      className="text-sm font-bold uppercase tracking-wider pb-2 mb-3 border-b"
                      style={{ color: '#0d9488', borderColor: '#e2e8f0' }}
                    >
                      Sprog
                    </h2>
                    <div className="flex flex-col gap-2">
                      {languages.map((lang) => (
                        <div key={lang.id} className="flex items-center justify-between">
                          <span className="text-xs" style={{ color: '#1e293b' }}>
                            {lang.name || 'Sprog'}
                          </span>
                          <span className="text-xs" style={{ color: '#94a3b8' }}>
                            {lang.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <StepNavigation />
    </div>
  );
}

# CV Builder Pro - Professional CV with PDF Export

En moderne, professionel CV Builder med **A4-perfekt PDF export**, **fuldt brugertilpassede temaer**, og **print-safe rendering**.

## 🎯 Hovedfeatures

### ✅ Modern Header Design
- **Gradient KUN i header** - resten af CV'et er ren hvid baggrund
- Profilfoto med korrekt aspect ratio
- Kontaktinfo med ikoner
- Responsive layout

### ✅ Fuldstændig Brugertilpasning
- **Farver**: Primær, Sekundær, Accent (color pickers + hex input)
- **Gradient styrke**: 0-100% slider
- **Skrifttype**: 6 professionelle fonts (Inter, Roboto, Open Sans, Lato, Merriweather, Georgia)
- **Skriftstørrelse**: 9-13px slider (sikre grænser)
- **Heading scale**: 1.0-1.5x slider

### ✅ A4-Perfekt PDF Export
- **Nøjagtige dimensioner**: 210mm × 297mm
- **Fast header højde**: 65mm max
- **Margin**: 18mm på alle sider
- **Print-safe mode**: Både `@media print` og `[data-render="print"]`
- **High-res**: 3x scale for skarp tekst
- **Ingen blur/glow i print**
- **Simplificeret gradient i PDF** (2-color linear)

### ✅ Professionel Typografi & Spacing
- **Kompakt spacing scale** optimeret til én side
- **CSS Design Tokens** for konsistent styling
- **Responsive font sizes** baseret på base size + scale
- **Proper line heights** og alignment

## 🏗️ Arkitektur

### CSS Design Tokens (CSS Variables)

Alle styles bruger CSS variables for nem tilpasning:

```css
:root {
  /* Colors */
  --primary: #1e40af;
  --secondary: #3b82f6;
  --accent: #60a5fa;
  --gradient-strength: 70;
  
  /* Typography */
  --font-family: 'Inter';
  --base-font-size: 11px;
  --heading-scale: 1.2;
  
  /* Computed sizes */
  --font-xs: calc(var(--base-font-size) * 0.85);
  --font-sm: var(--base-font-size);
  --font-base: calc(var(--base-font-size) * 1.1);
  --font-lg: calc(var(--base-font-size) * var(--heading-scale));
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 6px;
  --space-md: 10px;
  --space-lg: 14px;
  --space-xl: 18px;
  --space-2xl: 24px;
  
  /* A4 Dimensions */
  --a4-width: 210mm;
  --a4-height: 297mm;
  --page-margin: 18mm;
  --header-height: 65mm;
  --photo-size: 48mm;
}
```

### Print-Safe Rendering

To mekanismer for optimal PDF output:

#### 1. @media print
Standard CSS print rules:
```css
@media print {
  @page {
    size: A4;
    margin: 0;
  }
  
  .cv-header {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%) !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .cv-header::before {
    display: none; /* Remove texture in print */
  }
  
  .cv-item {
    page-break-inside: avoid;
  }
}
```

#### 2. [data-render="print"] Toggle
Programmatic control for PDF export:
```typescript
// Before PDF export
document.documentElement.setAttribute('data-render', 'print');

// Capture and export
await html2canvas(element, {...});

// Restore
document.documentElement.removeAttribute('data-render');
```

### Komponenter

```
src/
├── components/
│   ├── CvPage.tsx           # Main CV layout med sections
│   ├── CvHeader.tsx         # Header med gradient (ONLY gradient area)
│   ├── ThemePanel.tsx       # Color pickers, sliders, font selector
│   ├── PersonalInfoEditor.tsx
│   └── Editors.tsx          # Summary, Experience, Education, Skills, Languages
├── store/
│   └── cvStore.ts           # Zustand state management + localStorage
├── utils/
│   └── pdfExport.ts         # PDF export logic med print-safe mode
├── types/
│   └── cv.ts                # TypeScript types & theme config
└── styles/
    └── index.css            # CSS med design tokens + print styles
```

## 📄 PDF Export Implementation

### exportToPDF Function

```typescript
export async function exportToPDF(
  element: HTMLElement,
  fileName: string = 'CV.pdf'
): Promise<void> {
  try {
    // Step 1: Enable print mode
    document.documentElement.setAttribute('data-render', 'print');
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Step 2: Capture as high-res canvas
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff',
      windowWidth: 794,  // A4 width at 96dpi
      windowHeight: 1123 // A4 height at 96dpi
    });
    
    // Step 3: Create A4 PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    const pdfWidth = 210;
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    
    // Add image to PDF (with pagination if needed)
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
    // Step 4: Save
    pdf.save(fileName);
    
  } finally {
    // Step 5: Restore screen mode
    document.documentElement.removeAttribute('data-render');
  }
}
```

### Alternativ: Native Print Dialog

```typescript
export function printCV(): void {
  document.documentElement.setAttribute('data-render', 'print');
  window.print();
  setTimeout(() => {
    document.documentElement.removeAttribute('data-render');
  }, 1000);
}
```

## 🚀 Installation & Kørsel

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:3000

# Build for production
npm run build
```

## 💡 Hvordan Bruges Det

### 1. Udfyld CV Data
- Personlige oplysninger (navn, titel, kontakt, foto)
- Profiltekst
- Erhvervserfaring (position, virksomhed, achievements)
- Uddannelse
- Færdigheder (med niveau 1-5)
- Sprog (med niveau)

### 2. Tilpas Tema
- Vælg farver med color picker eller hex input
- Juster gradient styrke
- Vælg skrifttype fra dropdown
- Juster font størrelse (9-13px)
- Juster heading scale (1.0-1.5x)

### 3. Download PDF
- Klik "Download PDF" for optimal A4 PDF
- ELLER brug "Print" for native print dialog
- Filnavn: CV_Fornavn_Efternavn.pdf

## 📐 Layout Details

### Header (Gradient Area)
- **Højde**: Max 65mm
- **Baggrund**: Linear gradient fra primary → secondary (gradient strength%) → accent
- **Indhold**: Foto (48mm×48mm), navn, titel, kontaktinfo
- **Texture**: Subtle radial gradients (kun på skærm, ikke i print)

### Body (Hvid Baggrund)
- **Margin**: 18mm på alle sider
- **Sektioner**: Profil, Erhvervserfaring, Uddannelse, Færdigheder, Sprog
- **Spacing**: Kompakt men læsbart (6-24px scale)
- **Typography**: Responsive baseret på base size + heading scale

### Section Styling
- **Titel**: Primær farve, 2px border-bottom, bold
- **Items**: Konsistent spacing, clear hierarchy
- **Bullets**: Colored dots (sekundær farve)
- **Page breaks**: `page-break-inside: avoid` på items

## 🎨 Typography Scale

Baseret på `--base-font-size` (11px default) og `--heading-scale` (1.2x default):

```
--font-xs:   9.35px   (base * 0.85)
--font-sm:   11px     (base)
--font-base: 12.1px   (base * 1.1)
--font-lg:   13.2px   (base * scale)
--font-xl:   15.84px  (base * scale * 1.2)
--font-2xl:  19.8px   (base * scale * 1.5)
--font-3xl:  23.76px  (base * scale * 1.8)
```

## 🔧 Customization

### Ændre Default Tema

Rediger `src/types/cv.ts`:

```typescript
export const DEFAULT_THEME: ThemeConfig = {
  primaryColor: '#1e40af',      // Din farve
  secondaryColor: '#3b82f6',    // Din farve
  accentColor: '#60a5fa',       // Din farve
  gradientStrength: 70,         // 0-100
  fontFamily: 'Inter',          // Vælg fra FONT_OPTIONS
  baseFontSize: 11,             // 9-13
  headingScale: 1.2,            // 1.0-1.5
};
```

### Tilføj Nye Fonts

Rediger `src/types/cv.ts` og `src/styles/index.css`:

```typescript
// types/cv.ts
export const FONT_OPTIONS = [
  { value: 'Inter', label: 'Inter (Modern)' },
  { value: 'Your Font', label: 'Your Font Name' },
] as const;
```

```css
/* styles/index.css */
@import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@300;400;700&display=swap');
```

### Juster Spacing

Rediger CSS variables i `src/styles/index.css`:

```css
:root {
  --space-xs: 4px;   /* Mindre spacing */
  --space-sm: 6px;   /* Lille spacing */
  --space-md: 10px;  /* Medium spacing */
  --space-lg: 14px;  /* Stor spacing */
  --space-xl: 18px;  /* Ekstra stor */
  --space-2xl: 24px; /* Section spacing */
}
```

## 📱 Responsivitet

Desktop-first design. For tablets/mobil:
- Editor panel stacker under preview
- A4 preview skalerer ned
- Touch-friendly controls

## 🐛 Troubleshooting

### PDF ser anderledes ud end preview
- Sørg for at `data-render="print"` attribut tilføjes korrekt
- Check at `@media print` styles virker i din browser
- Prøv "Print" knappen for at teste native print styles

### Billeder vises ikke i PDF
- Sørg for at `useCORS: true` er sat i html2canvas options
- Brug base64 encoded images (som photo upload gør automatisk)

### Text er for lille/stor
- Juster `baseFontSize` slider (9-13px)
- Juster `headingScale` slider (1.0-1.5x)

### Gradient ser forkert ud
- Check at farver er valide hex values (#rrggbb)
- Juster `gradientStrength` slider (0-100%)

## 📦 Dependencies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS
- **Zustand** - State management
- **html2canvas** - Canvas rendering
- **jsPDF** - PDF generation
- **lucide-react** - Icons

## 📜 Licens

Privat projekt - Alle rettigheder forbeholdes.

---

**Built with ❤️ for professional CV creation**

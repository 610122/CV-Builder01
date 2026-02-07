# 🚀 Deployment Guide til Vercel

## Hvad du skal gøre (5 minutter)

### Metode A: Vercel Dashboard (Anbefalet - Nemmest)

#### Trin 1: Forbered GitHub Repository

1. **Gå til GitHub**
   - Besøg: https://github.com/new
   - Log ind med din GitHub konto

2. **Opret nyt repository**
   - Repository navn: `cv-builder-pro`
   - Vælg: **Public** (eller Private hvis du har Pro)
   - **VIGTIGT:** IKKE vælg "Add a README file"
   - Klik "Create repository"

3. **Upload filerne til GitHub**
   
   **Option 1: Via GitHub Web Interface (Nemmest)**
   - Klik "uploading an existing file" på den næste side
   - Træk og slip ALLE filer fra `cv-builder-final` mappen
   - Skriv commit message: "Initial commit"
   - Klik "Commit changes"
   
   **Option 2: Via Terminal (Hvis du er komfortabel med git)**
   ```bash
   cd cv-builder-final
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/DIT-BRUGERNAVN/cv-builder-pro.git
   git push -u origin main
   ```
   (Erstat `DIT-BRUGERNAVN` med dit GitHub brugernavn)

#### Trin 2: Deploy på Vercel

1. **Gå til Vercel**
   - Besøg: https://vercel.com/new
   - Klik "Continue with GitHub"
   - Authoriser Vercel til at få adgang til dine repositories

2. **Import Repository**
   - Find "cv-builder-pro" i listen
   - Klik "Import"

3. **Konfigurer Project** (Vigtigt!)
   - **Project Name:** cv-builder-pro (eller vælg dit eget)
   - **Framework Preset:** Vite (skulle være auto-detecteret)
   - **Root Directory:** ./ (standard)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Deploy!**
   - Klik den store "Deploy" knap
   - Vent 2-3 minutter

#### Trin 3: Færdig! 🎉

Efter deployment får du:
- En live URL: `https://cv-builder-pro-xyz.vercel.app`
- Automatisk HTTPS
- Global CDN
- Gratis hosting

---

### Metode B: Vercel CLI (Hurtigere)

#### Trin 1: Installer Vercel CLI

```bash
npm install -g vercel
```

#### Trin 2: Login til Vercel

```bash
vercel login
```

#### Trin 3: Deploy

I `cv-builder-final` mappen:

```bash
vercel
```

Besvar promptsene:
- `? Set up and deploy?` → **Y**
- `? Which scope?` → **Vælg dit team/account**
- `? Link to existing project?` → **N**
- `? What's your project's name?` → **cv-builder-pro**
- `? In which directory is your code located?` → **.** (bare tryk Enter)
- `? Want to modify these settings?` → **N**

Vent 2-3 minutter og du får en live URL!

---

## ✅ Hvad der sker under deployment

1. **Vercel installerer dependencies**
   ```bash
   npm install
   ```

2. **Vercel bygger projektet**
   ```bash
   npm run build
   ```

3. **Vercel deployer til CDN**
   - Output fra `dist/` mappen uploades
   - Spredt til global CDN
   - HTTPS aktiveres automatisk

---

## 🔄 Fremtidige Updates

Når du laver ændringer:

1. **Opdater kode lokalt**
2. **Push til GitHub:**
   ```bash
   git add .
   git commit -m "Beskrivelse af ændringer"
   git push
   ```
3. **Vercel deployer automatisk!** 🚀

---

## 🌐 Custom Domain (Valgfrit)

Vil du bruge dit eget domæne (f.eks. mitcv.dk)?

1. **I Vercel Dashboard:**
   - Gå til dit projekt
   - Klik "Settings" → "Domains"
   - Klik "Add"
   - Skriv dit domæne

2. **Opdater DNS hos din domæne udbyder:**
   - Følg Vercel's instruktioner
   - Tilføj de viste DNS records

---

## 🐛 Troubleshooting

### Problem: Build fejler

**Løsning:**
1. Test lokalt først:
   ```bash
   npm install
   npm run build
   ```
2. Hvis det virker lokalt, check Vercel build logs
3. Sørg for Node.js version er 18+ i Vercel Settings

### Problem: Blank side efter deployment

**Løsning:**
1. Check at `vercel.json` er med i repository
2. Check at output directory er sat til `dist`
3. Check browser console for fejl

### Problem: PDF download virker ikke

**Løsning:**
1. Check at alle dependencies er installeret
2. Test lokalt først
3. Check browser console for CORS fejl

### Problem: Data gemmes ikke

**Løsning:**
- Dette er forventet - localStorage gemmer kun i brugerens browser
- Data forsvinder ikke ved refresh, men er unik per bruger

---

## 📊 Performance Check

Efter deployment, test:

✅ **Funktionalitet:**
- [ ] CV editor loader
- [ ] Kan tilføje data
- [ ] Photo upload virker
- [ ] Theme customization virker
- [ ] PDF download virker

✅ **Performance:**
- [ ] Side loader under 3 sekunder
- [ ] Ingen console errors
- [ ] Responsive på mobil

---

## 💰 Vercel Free Tier

**Inkluderet gratis:**
- Unlimited deployments
- 100GB bandwidth/måned
- Automatic HTTPS
- Global CDN
- Custom domains
- Preview deployments

**Dette er mere end nok til CV Builder!**

---

## 📞 Support

Hvis du har problemer:

1. **Check build logs** i Vercel Dashboard
2. **Test lokalt** med `npm run dev`
3. **Læs README.md** for detaljeret dokumentation

---

## 🎯 Næste Skridt

Efter succesfuld deployment:

1. **Test din live app grundigt**
2. **Del linket** med potentielle brugere
3. **Overvej custom domain** hvis relevant
4. **Monitor Vercel Analytics** for at se usage

---

**Din CV Builder er nu live på nettet! 🎉**

Deployment URL vil være noget som:
```
https://cv-builder-pro-abc123.vercel.app
```

God fornøjelse! 🚀

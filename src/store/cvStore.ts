import { create } from 'zustand';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  website: string;
  summary: string;
  photo: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  languages: Language[];
}

interface CVStore {
  currentStep: number;
  data: CVData;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addLanguage: () => void;
  updateLanguage: (id: string, data: Partial<Language>) => void;
  removeLanguage: (id: string) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const TOTAL_STEPS = 5;

export const useCVStore = create<CVStore>((set) => ({
  currentStep: 0,
  data: {
    personalInfo: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: '',
      summary: '',
      photo: '',
    },
    experiences: [],
    educations: [],
    skills: [],
    languages: [],
  },

  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS - 1) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),

  updatePersonalInfo: (info) =>
    set((state) => ({
      data: {
        ...state.data,
        personalInfo: { ...state.data.personalInfo, ...info },
      },
    })),

  addExperience: () =>
    set((state) => ({
      data: {
        ...state.data,
        experiences: [
          ...state.data.experiences,
          {
            id: generateId(),
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
          },
        ],
      },
    })),

  updateExperience: (id, update) =>
    set((state) => ({
      data: {
        ...state.data,
        experiences: state.data.experiences.map((exp) =>
          exp.id === id ? { ...exp, ...update } : exp
        ),
      },
    })),

  removeExperience: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        experiences: state.data.experiences.filter((exp) => exp.id !== id),
      },
    })),

  addEducation: () =>
    set((state) => ({
      data: {
        ...state.data,
        educations: [
          ...state.data.educations,
          {
            id: generateId(),
            institution: '',
            degree: '',
            field: '',
            startDate: '',
            endDate: '',
            description: '',
          },
        ],
      },
    })),

  updateEducation: (id, update) =>
    set((state) => ({
      data: {
        ...state.data,
        educations: state.data.educations.map((edu) =>
          edu.id === id ? { ...edu, ...update } : edu
        ),
      },
    })),

  removeEducation: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        educations: state.data.educations.filter((edu) => edu.id !== id),
      },
    })),

  addSkill: () =>
    set((state) => ({
      data: {
        ...state.data,
        skills: [
          ...state.data.skills,
          { id: generateId(), name: '', level: 3 },
        ],
      },
    })),

  updateSkill: (id, update) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.map((skill) =>
          skill.id === id ? { ...skill, ...update } : skill
        ),
      },
    })),

  removeSkill: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.filter((skill) => skill.id !== id),
      },
    })),

  addLanguage: () =>
    set((state) => ({
      data: {
        ...state.data,
        languages: [
          ...state.data.languages,
          { id: generateId(), name: '', level: 'Mellem' },
        ],
      },
    })),

  updateLanguage: (id, update) =>
    set((state) => ({
      data: {
        ...state.data,
        languages: state.data.languages.map((lang) =>
          lang.id === id ? { ...lang, ...update } : lang
        ),
      },
    })),

  removeLanguage: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        languages: state.data.languages.filter((lang) => lang.id !== id),
      },
    })),
}));

import type { Phase } from '@/types'
import { phase0 } from './phase-0'
import { phase1 } from './phase-1'
import { phase2 } from './phase-2'
import { phase3, phase4, phase5, phase6 } from './phase-3-6'
import { phase7, phase8, phase9, phase10, phase11, phase12 } from './phase-7-12'

export const phases: Phase[] = [
  phase0, phase1, phase2, phase3, phase4, phase5, phase6,
  phase7, phase8, phase9, phase10, phase11, phase12,
]

export function getPhaseById(id: string): Phase | undefined {
  return phases.find((p) => p.id === id)
}

export function getLesson(phaseId: string, lessonId: string) {
  const phase = getPhaseById(phaseId)
  return phase?.lessons.find((l) => l.id === lessonId)
}

export const aviationGlossary = [
  { term: 'Boarding', definition: 'Process of passengers entering the aircraft', category: 'Operations' },
  { term: 'Cabin Crew', definition: 'Flight attendants responsible for passenger safety and service', category: 'Personnel' },
  { term: 'Cockpit', definition: 'Flight deck where pilots operate the aircraft', category: 'Aircraft' },
  { term: 'Decompression', definition: 'Loss of cabin pressure at altitude', category: 'Safety' },
  { term: 'Ditching', definition: 'Emergency landing on water', category: 'Safety' },
  { term: 'Evacuation', definition: 'Emergency exit of all passengers and crew', category: 'Safety' },
  { term: 'Galley', definition: 'Aircraft kitchen for food preparation', category: 'Aircraft' },
  { term: 'GCAA', definition: 'General Civil Aviation Authority of UAE', category: 'Regulatory' },
  { term: 'ICAO', definition: 'International Civil Aviation Organization', category: 'Regulatory' },
  { term: 'Layover', definition: 'Rest period between flights at a destination', category: 'Operations' },
  { term: 'Life Vest', definition: 'Flotation device for water emergencies', category: 'Safety' },
  { term: 'Purser', definition: 'Senior cabin crew member leading the team', category: 'Personnel' },
  { term: 'SEP', definition: 'Safety and Emergency Procedures training', category: 'Training' },
  { term: 'Turbulence', definition: 'Irregular air movement causing aircraft bumpiness', category: 'Operations' },
  { term: 'Wide-body', definition: 'Aircraft with two aisles (e.g., A350, B787)', category: 'Aircraft' },
]

export const speakingPrompts = [
  { id: 'sp1', prompt: 'Tell me about yourself and why you want to be cabin crew.', duration: 120 },
  { id: 'sp2', prompt: 'Why do you want to join Etihad Airways specifically?', duration: 120 },
  { id: 'sp3', prompt: 'Describe a time you provided excellent customer service.', duration: 120 },
  { id: 'sp4', prompt: 'How would you handle a difficult passenger?', duration: 90 },
  { id: 'sp5', prompt: 'Tell me about a time you worked in a team.', duration: 120 },
  { id: 'sp6', prompt: 'How do you handle stress and long working hours?', duration: 90 },
  { id: 'sp7', prompt: 'What would you do in a medical emergency on board?', duration: 90 },
  { id: 'sp8', prompt: 'Describe your strengths and weaknesses.', duration: 120 },
]

export const sjtQuestions = [
  {
    id: 'sjt1',
    scenario: { uz: 'Hamkasbingiz kechikdi va siz ikki vazifani bajarishingiz kerak.', en: 'Your colleague is late and you need to cover two tasks.' },
    options: [
      { text: { uz: 'Bosh menejerga xabar beraman va ikkalasini ham bajonman', en: 'Inform supervisor and handle both tasks' }, score: 10 },
      { text: { uz: 'Hech narsa qilmayman', en: 'Do nothing' }, score: 0 },
      { text: { uz: 'Faqat o\'z vazifamni bajonman', en: 'Only do my own task' }, score: 3 },
      { text: { uz: 'Hamkasbimni shikoyat qilaman', en: 'Complain about colleague' }, score: 1 },
    ],
  },
  {
    id: 'sjt2',
    scenario: { uz: 'Yo\'lovchi allergik reaksiya ko\'rsatmoqda.', en: 'A passenger is showing allergic reaction.' },
    options: [
      { text: { uz: 'Darhol tibbiy yordam va ekipajni xabar qilaman', en: 'Immediately provide medical help and notify crew' }, score: 10 },
      { text: { uz: 'Kutaman, o\'z-o\'zidan o\'tadi', en: 'Wait, it will pass' }, score: 0 },
      { text: { uz: 'Boshqa yo\'lovchilardan yordam so\'rayman', en: 'Ask other passengers for help' }, score: 5 },
      { text: { uz: 'Faqat suv beraman', en: 'Only give water' }, score: 2 },
    ],
  },
]

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FileText, FileSignature, Folder, ListChecks, Download,
  Upload, CheckCircle, Eye, Sparkles,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { PageHero } from '@/components/ui/page-hero'
import { SectionHeader } from '@/components/ui/section-header'
import { StatTile } from '@/components/ui/stat-tile'
import { TabNav } from '@/components/ui/tab-nav'
import { useAppStore } from '@/stores/app-store'
import type { Document, CVData } from '@/types'

const DOC_TYPES: Document['type'][] = ['cv', 'photo', 'passport', 'diploma', 'certificate']

const APPLICATION_CHECKLIST = [
  { id: 'c1', text: { uz: 'careers.etihad.com ga kiring', en: 'Go to careers.etihad.com' } },
  { id: 'c2', text: { uz: 'CV yuklang', en: 'Upload CV' } },
  { id: 'c3', text: { uz: 'Savollarga javob bering', en: 'Answer all questions' } },
  { id: 'c4', text: { uz: 'Skill assessment to\'ldiring', en: 'Complete skill assessment' } },
  { id: 'c5', text: { uz: 'Submit application', en: 'Submit application' } },
]

export function DocumentsPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const cvData = useAppStore((s) => s.cvData)
  const updateCV = useAppStore((s) => s.updateCV)
  const documents = useAppStore((s) => s.documents)
  const uploadDocument = useAppStore((s) => s.uploadDocument)
  const [tab, setTab] = useState<'cv' | 'vault' | 'checklist'>('cv')
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const handleCVChange = (field: keyof CVData, value: string) => {
    updateCV({ [field]: value })
  }

  const handleFileUpload = (type: Document['type'], e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadDocument(type, file.name)
  }

  const exportCV = () => {
    const text = `
${cvData.fullName}
${cvData.email} | ${cvData.phone}
Nationality: ${cvData.nationality}
Languages: ${cvData.languages}

PROFESSIONAL SUMMARY
${cvData.summary}

EDUCATION
${cvData.education}

EXPERIENCE
${cvData.experience}

SKILLS
${cvData.skills}
    `.trim()

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'CV-Etihad-Cabin-Crew.txt'
    a.click()
    uploadDocument('cv', 'CV-Etihad-Cabin-Crew.txt')
  }

  const uploadedCount = DOC_TYPES.filter((type) => documents.some((d) => d.type === type)).length
  const checklistDone = checked.size

  const tabs = [
    { key: 'cv' as const, label: t('documents.cvBuilder'), icon: <FileSignature className="h-3.5 w-3.5" /> },
    { key: 'vault' as const, label: t('documents.vault'), icon: <Folder className="h-3.5 w-3.5" /> },
    { key: 'checklist' as const, label: t('documents.checklist'), icon: <ListChecks className="h-3.5 w-3.5" /> },
  ]

  return (
    <div className="space-y-6 pb-4">
      <PageHero
        variant="emerald"
        icon={<FileText className="h-6 w-6" />}
        eyebrow={t('documents.title')}
        title={t('documents.title')}
        subtitle={t('documentsPage.subtitle')}
        decorIcon={<FileSignature className="h-12 w-12 text-etihad-gold" />}
      />

      <section className="grid grid-cols-3 gap-3">
        <StatTile icon={<Folder className="h-4 w-4" />} label={t('documents.vault')} value={`${uploadedCount}/${DOC_TYPES.length}`} gradient="emerald" delay="delay-1" />
        <StatTile icon={<ListChecks className="h-4 w-4" />} label={t('documents.checklist')} value={`${checklistDone}/${APPLICATION_CHECKLIST.length}`} gradient="gold" delay="delay-2" />
        <StatTile icon={<FileSignature className="h-4 w-4" />} label={t('documents.cvBuilder')} value={cvData.fullName ? '✓' : '—'} gradient="ocean" delay="delay-3" />
      </section>

      <TabNav options={tabs} value={tab} onChange={setTab} />

      {tab === 'cv' && (
        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="slide-in-up">
            <SectionHeader icon={<FileSignature className="h-4 w-4" />} title={t('cv.title')} />
            <div className="space-y-3">
              <Input label={t('cv.fullName')} value={cvData.fullName} onChange={(e) => handleCVChange('fullName', e.target.value)} />
              <div className="grid grid-cols-2 gap-3">
                <Input label={t('cv.email')} value={cvData.email} onChange={(e) => handleCVChange('email', e.target.value)} />
                <Input label={t('cv.phone')} value={cvData.phone} onChange={(e) => handleCVChange('phone', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label={t('cv.nationality')} value={cvData.nationality} onChange={(e) => handleCVChange('nationality', e.target.value)} />
                <Input label={t('cv.languagesLabel')} value={cvData.languages} onChange={(e) => handleCVChange('languages', e.target.value)} />
              </div>
              <Textarea label={t('cv.summary')} value={cvData.summary} onChange={(e) => handleCVChange('summary', e.target.value)} rows={3} />
              <Textarea label={t('cv.education')} value={cvData.education} onChange={(e) => handleCVChange('education', e.target.value)} rows={2} />
              <Textarea label={t('cv.experience')} value={cvData.experience} onChange={(e) => handleCVChange('experience', e.target.value)} rows={3} />
              <Textarea label={t('cv.skills')} value={cvData.skills} onChange={(e) => handleCVChange('skills', e.target.value)} rows={2} />
              <div className="flex gap-2 pt-2">
                <Button onClick={() => updateCV(cvData)}>{t('cv.save')}</Button>
                <Button variant="gold" onClick={exportCV}><Download className="h-4 w-4" />{t('documents.export')}</Button>
              </div>
            </div>
          </Card>

          <Card className="slide-in-up delay-2 gradient-cockpit text-white">
            <SectionHeader
              icon={<Eye className="h-4 w-4 text-etihad-gold" />}
              title={t('documentsPage.previewLabel')}
              className="!text-white"
            />
            <pre className="overflow-auto whitespace-pre-wrap rounded-2xl bg-white/10 p-4 font-mono text-xs leading-relaxed backdrop-blur">
{`${cvData.fullName || 'Your Name'}
${cvData.email || 'email@example.com'} | ${cvData.phone || '+998 ...'}
Nationality: ${cvData.nationality || '—'}
Languages: ${cvData.languages || '—'}

PROFESSIONAL SUMMARY
${cvData.summary || '...'}

EDUCATION
${cvData.education || '...'}

EXPERIENCE
${cvData.experience || '...'}

SKILLS
${cvData.skills || '...'}`}
            </pre>
          </Card>
        </section>
      )}

      {tab === 'vault' && (
        <section>
          <SectionHeader icon={<Folder className="h-4 w-4" />} title={t('documentsPage.vaultDesc')} />
          <div className="space-y-3">
            {DOC_TYPES.map((type, i) => {
              const doc = documents.find((d) => d.type === type)
              return (
                <Card
                  key={type}
                  style={{ animationDelay: `${i * 50}ms` }}
                  className="slide-in-up hover-lift"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${doc ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                        {doc ? <CheckCircle className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-bold text-etihad-dark">{t(`documents.types.${type}`)}</p>
                        {doc && <p className="text-xs text-gray-500">{doc.name}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={doc ? 'success' : 'warning'}>
                        {t(`documents.status.${doc?.status || 'missing'}`)}
                      </Badge>
                      <label className="cursor-pointer">
                        <input type="file" className="hidden" onChange={(e) => handleFileUpload(type, e)} />
                        <span className="inline-flex items-center gap-1 rounded-lg bg-etihad-blue px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-etihad-dark">
                          <Upload className="h-3 w-3" /> {t('documents.upload')}
                        </span>
                      </label>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>
      )}

      {tab === 'checklist' && (
        <section>
          <SectionHeader icon={<ListChecks className="h-4 w-4" />} title={t('documentsPage.checklistDesc')} />
          <Card>
            <div className="space-y-2">
              {APPLICATION_CHECKLIST.map((item, i) => {
                const isChecked = checked.has(item.id)
                return (
                  <label
                    key={item.id}
                    style={{ animationDelay: `${i * 40}ms` }}
                    className={`slide-in-up flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all ${
                      isChecked ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-etihad-blue/40 hover:bg-etihad-light'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        const next = new Set(checked)
                        if (e.target.checked) next.add(item.id)
                        else next.delete(item.id)
                        setChecked(next)
                      }}
                      className="h-4 w-4 accent-etihad-blue"
                    />
                    <span className={`flex-1 text-sm ${isChecked ? 'line-through text-gray-500' : 'text-etihad-dark'}`}>
                      {lang === 'uz' ? item.text.uz : item.text.en}
                    </span>
                    {isChecked && <Sparkles className="h-4 w-4 text-etihad-gold" />}
                  </label>
                )
              })}
            </div>
          </Card>
        </section>
      )}
    </div>
  )
}

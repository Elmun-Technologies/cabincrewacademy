import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
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
    if (file) {
      uploadDocument(type, file.name)
    }
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-etihad-dark">{t('documents.title')}</h1>
      </div>

      <div className="flex gap-2">
        {(['cv', 'vault', 'checklist'] as const).map((tabKey) => (
          <Button key={tabKey} variant={tab === tabKey ? 'default' : 'outline'} size="sm" onClick={() => setTab(tabKey)}>
            {t(`documents.${tabKey === 'cv' ? 'cvBuilder' : tabKey === 'vault' ? 'vault' : 'checklist'}`)}
          </Button>
        ))}
      </div>

      {tab === 'cv' && (
        <Card>
          <CardTitle className="mb-4">{t('cv.title')}</CardTitle>
          <CardContent className="space-y-4">
            <Input label={t('cv.fullName')} value={cvData.fullName} onChange={(e) => handleCVChange('fullName', e.target.value)} />
            <Input label={t('cv.email')} value={cvData.email} onChange={(e) => handleCVChange('email', e.target.value)} />
            <Input label={t('cv.phone')} value={cvData.phone} onChange={(e) => handleCVChange('phone', e.target.value)} />
            <Input label={t('cv.nationality')} value={cvData.nationality} onChange={(e) => handleCVChange('nationality', e.target.value)} />
            <Input label={t('cv.languagesLabel')} value={cvData.languages} onChange={(e) => handleCVChange('languages', e.target.value)} />
            <Textarea label={t('cv.summary')} value={cvData.summary} onChange={(e) => handleCVChange('summary', e.target.value)} rows={3} />
            <Textarea label={t('cv.education')} value={cvData.education} onChange={(e) => handleCVChange('education', e.target.value)} rows={2} />
            <Textarea label={t('cv.experience')} value={cvData.experience} onChange={(e) => handleCVChange('experience', e.target.value)} rows={3} />
            <Textarea label={t('cv.skills')} value={cvData.skills} onChange={(e) => handleCVChange('skills', e.target.value)} rows={2} />

            <Card className="bg-gray-50">
              <CardTitle className="mb-2 text-sm">{t('cv.preview')}</CardTitle>
              <pre className="whitespace-pre-wrap text-xs text-gray-700">{`
${cvData.fullName || 'Your Name'}
${cvData.email} | ${cvData.phone}
${cvData.summary}
              `.trim()}</pre>
            </Card>

            <div className="flex gap-2">
              <Button onClick={() => updateCV(cvData)}>{t('cv.save')}</Button>
              <Button variant="gold" onClick={exportCV}>{t('documents.export')}</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === 'vault' && (
        <div className="space-y-3">
          {DOC_TYPES.map((type) => {
            const doc = documents.find((d) => d.type === type)
            return (
              <Card key={type}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t(`documents.types.${type}`)}</p>
                    {doc && <p className="text-xs text-gray-500">{doc.name}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={doc ? 'success' : 'warning'}>
                      {t(`documents.status.${doc?.status || 'missing'}`)}
                    </Badge>
                    <label className="cursor-pointer">
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(type, e)} />
                      <span className="rounded-lg bg-etihad-blue px-3 py-1 text-xs text-white">{t('documents.upload')}</span>
                    </label>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {tab === 'checklist' && (
        <Card>
          <CardTitle className="mb-4">{t('documents.checklist')}</CardTitle>
          <div className="space-y-2">
            {APPLICATION_CHECKLIST.map((item) => (
              <label key={item.id} className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked.has(item.id)}
                  onChange={(e) => {
                    const next = new Set(checked)
                    if (e.target.checked) next.add(item.id)
                    else next.delete(item.id)
                    setChecked(next)
                  }}
                  className="h-4 w-4 accent-etihad-blue"
                />
                <span>{lang === 'uz' ? item.text.uz : item.text.en}</span>
              </label>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

export interface Faq {
  id: string
  category: 'shipping' | 'returns' | 'sizing' | 'orders' | 'account' | 'customizer'
  question: string
  answer: string
}

export const faqs: Faq[] = [
  {
    id: 'f1',
    category: 'shipping',
    question: 'How long does shipping take?',
    answer:
      'Standard shipping is 3–5 business days. Express shipping is 1–2 business days. Orders placed before 2 PM ship same-day.',
  },
  {
    id: 'f2',
    category: 'shipping',
    question: 'Do you ship internationally?',
    answer:
      'Yes. We ship to over 80 countries. International delivery typically takes 7–14 business days depending on your location and customs.',
  },
  {
    id: 'f3',
    category: 'shipping',
    question: 'Is shipping free?',
    answer:
      'Shipping is free on all orders over $75. For orders below that, standard shipping is $7.95.',
  },
  {
    id: 'f4',
    category: 'returns',
    question: 'What is your return policy?',
    answer:
      'You have 60 days from delivery to return unworn items in original packaging for a full refund. Customized products are final sale.',
  },
  {
    id: 'f5',
    category: 'returns',
    question: 'How do I start a return?',
    answer:
      'Go to your Account → Orders → Select the item → Click "Start Return". We will email you a prepaid label.',
  },
  {
    id: 'f6',
    category: 'sizing',
    question: 'How do I find my size?',
    answer:
      'Each product page has a sizing guide button. For sneakers, we recommend ordering your normal running shoe size. Apparel follows standard XS–XXL sizing.',
  },
  {
    id: 'f7',
    category: 'sizing',
    question: 'What if my shoes do not fit?',
    answer:
      'Unworn sneakers can be exchanged free of charge within 60 days. We will cover return shipping on the exchange.',
  },
  {
    id: 'f8',
    category: 'orders',
    question: 'How can I track my order?',
    answer:
      'Use the Track Order page with your order number and email. You will also receive tracking updates by email after your order ships.',
  },
  {
    id: 'f9',
    category: 'orders',
    question: 'Can I cancel or change my order?',
    answer:
      'You can edit or cancel an order within 30 minutes of purchase from your Account → Orders page. After that, we have already started fulfilment.',
  },
  {
    id: 'f10',
    category: 'account',
    question: 'Do I need an account to buy?',
    answer:
      'No. Guest checkout is supported. An account lets you save addresses, track orders, and earn PulsePoints rewards.',
  },
  {
    id: 'f11',
    category: 'customizer',
    question: 'What is PULSE Studio?',
    answer:
      'PULSE Studio is our customizer. Pick a base silhouette, then change the color of every panel — upper, swoosh, sole, laces, and inner lining. Add your initials too.',
  },
  {
    id: 'f12',
    category: 'customizer',
    question: 'How long do customized shoes take to ship?',
    answer:
      'Customized orders are hand-finished in our Atelier and ship within 10–14 business days. Tracking is sent the moment they are dispatched.',
  },
]

export const faqCategories: { value: string; label: string }[] = [
  { value: 'shipping', label: 'Shipping' },
  { value: 'returns', label: 'Returns & Exchanges' },
  { value: 'sizing', label: 'Sizing' },
  { value: 'orders', label: 'Orders' },
  { value: 'account', label: 'Account' },
  { value: 'customizer', label: 'PULSE Studio' },
]

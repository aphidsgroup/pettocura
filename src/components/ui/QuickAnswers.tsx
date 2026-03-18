import AnimatedSection from './AnimatedSection';

interface QuickAnswer {
  question: string;
  answer: string;
}

interface QuickAnswersProps {
  answers: QuickAnswer[];
}

export default function QuickAnswers({ answers }: QuickAnswersProps) {
  return (
    <AnimatedSection>
      <div className="bg-gradient-to-br from-teal-50/80 to-stone-50 rounded-3xl p-8 border border-teal-100/60">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-stone-900">Quick Answers</h2>
        </div>
        <div className="space-y-5">
          {answers.map((qa, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
              <h3 className="font-semibold text-stone-900 mb-2 flex items-start gap-2">
                <span className="text-teal-600 mt-0.5">Q.</span>
                {qa.question}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed pl-6">
                {qa.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

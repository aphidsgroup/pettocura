import AnimatedSection from './AnimatedSection';

interface KeyFact {
  label: string;
  value: string;
}

interface KeyFactsTableProps {
  title?: string;
  facts: KeyFact[];
}

export default function KeyFactsTable({ title = 'Key Facts', facts }: KeyFactsTableProps) {
  return (
    <AnimatedSection>
      <div className="bg-white rounded-3xl border border-stone-200/60 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-4">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {title}
          </h3>
        </div>
        <table className="w-full">
          <tbody>
            {facts.map((fact, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-stone-50/50' : 'bg-white'}>
                <td className="px-6 py-3.5 text-sm font-semibold text-stone-700 w-[40%] border-r border-stone-100">
                  {fact.label}
                </td>
                <td className="px-6 py-3.5 text-sm text-stone-600">
                  {fact.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AnimatedSection>
  );
}

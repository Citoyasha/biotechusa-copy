import { useEffect } from 'react'

const CHARTS = {
  homme: {
    title: 'MENSURATION CORPORELLE HOMME',
    headers: ['TAILLE', 'TAILLE (cm)', 'TOUR DE POITRINE', 'TOUR DE TAILLE', 'TOUR DE BASSIN'],
    rows: [
      ['S', '177-180', '86-92', '75-81', '94-98'],
      ['M', '180-183', '92-98', '81-87', '98-102'],
      ['L', '183-186', '98-106', '87-95', '102-110'],
      ['XL', '186-189', '106-114', '95-103', '110-116'],
      ['XXL', '189-192', '114-122', '103-111', '116-122'],
    ],
    notes: [
      { t: 'Poitrine :', d: 'Mesurez votre poitrine dans la zone la plus large.' },
      { t: 'Taille :', d: 'Mesurez votre taille à son point le plus étroit.' },
      { t: 'Bassin :', d: "Mesurez l'endroit le plus large de vos hanches." },
    ],
  },
  femme: {
    title: 'MENSURATION CORPORELLE FEMME',
    headers: ['TAILLE', 'TAILLE (cm)', 'TOUR DE POITRINE', 'TOUR DE TAILLE', 'TOUR DE BASSIN'],
    rows: [
      ['XS', '160-164', '78-82', '60-64', '86-90'],
      ['S', '164-168', '82-86', '64-68', '90-94'],
      ['M', '168-172', '86-90', '68-72', '94-98'],
      ['L', '172-176', '90-96', '72-78', '98-104'],
      ['XL', '176-180', '96-102', '78-84', '104-110'],
    ],
    notes: [
      { t: 'Poitrine :', d: 'Mesurez votre poitrine dans la zone la plus large, en portant un soutien-gorge qui vous convient.' },
      { t: 'Taille :', d: 'Mesurez votre taille à son point le plus étroit.' },
      { t: 'Bassin :', d: "Mesurez l'endroit le plus large de vos hanches." },
    ],
  },
}

export default function SizeChartModal({ chartKey, onClose }) {
  const chart = CHARTS[chartKey] || CHARTS.homme

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 flex items-start md:items-center justify-center overflow-y-auto p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-lg max-w-[900px] w-full relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eff1f1]">
          <h2 className="text-[14px] font-bold text-[#36474e] tracking-wide">{chart.title}</h2>
          <button type="button" onClick={onClose} aria-label="Fermer" className="p-1 text-[#36474e] hover:text-[#1babf9]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-[13px] text-left">
            <thead>
              <tr className="border-b border-[#eff1f1]">
                {chart.headers.map((h) => (
                  <th key={h} className="py-2 px-2 font-bold text-[#36474e] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chart.rows.map((row, i) => (
                <tr key={i} className="border-b border-[#eff1f1]">
                  {row.map((cell, j) => (
                    <td key={j} className={`py-2 px-2 whitespace-nowrap ${j === 0 ? 'font-bold text-[#36474e]' : 'text-[#6b7a8d]'}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 space-y-3 text-[13px] text-[#6b7a8d]">
            {chart.notes.map((n, i) => (
              <div key={i}>
                <span className="font-bold text-[#36474e]">{n.t}</span> {n.d}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

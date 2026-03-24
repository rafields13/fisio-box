import { useState } from 'react'

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

export default function BotaoVoz({ onTranscript, disabled }) {
  const [gravando, setGravando] = useState(false)

  if (!SpeechRecognition) return null

  function handleClick() {
    if (gravando) return

    const rec = new SpeechRecognition()
    rec.lang = 'pt-BR'
    rec.continuous = false
    rec.interimResults = false

    rec.onstart = () => setGravando(true)

    rec.onresult = (e) => {
      const texto = e.results[0][0].transcript
      onTranscript(texto)
    }

    rec.onerror = () => setGravando(false)
    rec.onend = () => setGravando(false)

    rec.start()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || gravando}
      title={gravando ? 'Ouvindo...' : 'Clique para ditar'}
      className={`no-print flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
        gravando
          ? 'bg-red-100 text-red-600 animate-pulse cursor-not-allowed'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3.5 h-3.5"
      >
        <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4z" />
        <path d="M19 11a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-2.08A7 7 0 0 0 19 11z" />
      </svg>
      {gravando ? 'Ouvindo...' : ''}
    </button>
  )
}

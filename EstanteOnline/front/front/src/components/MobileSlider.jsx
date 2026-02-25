import { useState, memo, useCallback } from "react"

function MobileSlider({ livros, onSelect }) {
  const [indice, setIndice] = useState(0)

  const proximo = useCallback(() => {
    setIndice(prev => (prev + 1) % livros.length)
  }, [livros.length])

  const anterior = useCallback(() => {
    setIndice(prev =>
      prev === 0 ? livros.length - 1 : prev - 1
    )
  }, [livros.length])

  if (!livros.length) return null

  const livro = livros[indice]

  return (
    <div className="mobile-slider-container">

      <button
        className="mobile-seta left"
        onClick={anterior}
      >
        ‹
      </button>

      <div
        className="mobile-slider-card"
        onClick={() => onSelect(livro)}
      >
        <img
          src={livro.capa}
          alt={livro.titulo}
          loading="lazy"
          decoding="async"
        />
        <h3>{livro.titulo}</h3>
        <p>{livro.autor}</p>
      </div>

      <button
        className="mobile-seta right"
        onClick={proximo}
      >
        ›
      </button>

    </div>
  )
}

export default memo(MobileSlider)
    
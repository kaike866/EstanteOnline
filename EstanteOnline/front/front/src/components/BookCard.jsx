import { memo } from "react"

function BookCard({ livro, onClick }) {
  return (
    <div className="card" onClick={() => onClick(livro)}>
      <img
        src={livro.capa}
        alt={livro.titulo}
        loading="lazy"
        decoding="async"
      />
      <h3>{livro.titulo}</h3>
      <p>{livro.autor}</p>
    </div>
  )
}

export default memo(BookCard)

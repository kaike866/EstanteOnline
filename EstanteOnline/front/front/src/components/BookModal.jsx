import { useState, useCallback } from "react"
import { downloadLivro } from "../services/api"

function BookModal({ livro, fechar }) {
  const [status, setStatus] = useState(null)

  const baixar = useCallback(() => {
    try {
      setStatus("baixando")

      const link = document.createElement("a")
      link.href = downloadLivro(livro._id)
      link.setAttribute("download", livro.arquivo || livro.titulo + ".pdf")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setStatus("concluido")
      setTimeout(() => setStatus(null), 2000)
    } catch (err) {
      console.error(err)
      setStatus("erro")
    }
  }, [livro])

  return (
    <div className="modal-overlay">
      <div className="modal">
        <img src={livro.capa} alt={livro.titulo} style={{ width: "180px", borderRadius: "12px", marginBottom: "15px" }}/>
        <h2>{livro.titulo}</h2>
        <p>{livro.resumo}</p>

        <button onClick={baixar} disabled={status === "baixando"}>
          {status === "baixando" && "⏳ Baixando..."}
          {status === "concluido" && "✅ Concluído!"}
          {status === "erro" && "❌ Erro"}
          {!status && "📥 Baixar PDF"}
        </button>

        <button className="fechar" onClick={fechar}>Fechar</button>
      </div>
    </div>
  )
}

export default BookModal

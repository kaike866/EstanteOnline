import { useEffect, useState, useCallback } from "react"
import { getLivros } from "../services/api"
import BookCard from "../components/BookCard"
import BookModal from "../components/BookModal"
import Footer from "../components/Footer"
import MobileSlider from "../components/MobileSlider"

function Home() {
  const [livros, setLivros] = useState([])
  const [livroSelecionado, setLivroSelecionado] = useState(null)
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches
  )

  // Detecta mobile de forma leve
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)")
    const listener = () => setIsMobile(media.matches)

    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [])

  // 🔥 SEM CACHE (CORRIGIDO)
  useEffect(() => {
    async function carregarLivros() {
      try {
        const data = await getLivros()
        setLivros(data)
      } catch (error) {
        console.error("Erro ao carregar livros:", error)
      }
    }

    carregarLivros()
  }, [])

  // Preload da primeira imagem
  useEffect(() => {
    if (livros.length > 0) {
      const img = new Image()
      img.src = livros[0].capa
    }
  }, [livros])

  // Trava scroll quando modal abre
  useEffect(() => {
    document.body.style.overflow = livroSelecionado ? "hidden" : "auto"
  }, [livroSelecionado])

  const selecionarLivro = useCallback((livro) => {
    setLivroSelecionado(livro)
  }, [])

  return (
    <>
      <h1>✨ Biblioteca Digital Premium</h1>

      {/* DESKTOP */}
      {!isMobile && (
        <div className="grid">
          {livros.map((livro) => (
            <BookCard
              key={livro._id}
              livro={livro}
              onClick={() => selecionarLivro(livro)}
            />
          ))}
        </div>
      )}

      {/* MOBILE */}
      {isMobile && livros.length > 0 && (
        <MobileSlider
          livros={livros}
          onSelect={selecionarLivro}
        />
      )}

      {/* MODAL */}
      {livroSelecionado && (
        <BookModal
          livro={livroSelecionado}
          fechar={() => setLivroSelecionado(null)}
        />
      )}

      {!livroSelecionado && <Footer />}
    </>
  )
}

export default Home

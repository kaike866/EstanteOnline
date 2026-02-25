import React from 'react'

const NotFound = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #141e30, #243b55)',
        color: '#fff',
        textAlign: 'center',
        padding: '20px'
      }}
    >
      <h1 style={{ fontSize: '4rem', marginBottom: '20px', color: '#facc15' }}>
        404
      </h1>

      <p style={{ fontSize: '1.5rem', opacity: 0.9 }}>
        Página não encontrada
      </p>

      <a
        href="/"
        style={{
          marginTop: '30px',
          padding: '12px 24px',
          borderRadius: '8px',
          background: '#facc15',
          color: '#000',
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: '0.3s'
        }}
      >
        Voltar para Home
      </a>
    </div>
  )
}

export default NotFound

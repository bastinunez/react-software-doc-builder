import React from 'react'

const CardModulo = ({nombre,seccion}) => {
  return (
    <div className=''>
      <button className='estilo-card h-auto'>
        <div className='grid-contenido-card'>
              <div className='grid-card-1'>
              </div>
              <div className='grid-card-2'>
                <h4>{nombre} - Seccion {seccion}</h4>
              </div>
          </div>
      </button>
    </div>
  )
}

export default CardModulo

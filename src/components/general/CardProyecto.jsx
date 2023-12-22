import React from 'react'

const CardProyecto = ({nombre,proyecto}) => {
  return (
    <div className=''>
      <button className='estilo-card h-auto'>
        <div className='grid-contenido-card'>
              <div className='grid-card-1'>
              </div>
              <div className='grid-card-2'>
                <h4>{nombre}</h4>
              </div>
          </div>
      </button>
    </div>
  )
}

export default CardProyecto

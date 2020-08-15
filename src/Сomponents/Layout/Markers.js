import React from 'react'

const Markers = () => {
  return (
    <div className="markers">
      <div className="marker">
        <div style={{...icon, backgroundColor:'#CCFFCC'}}></div>
        <p>Заказ выполнен</p>
      </div>
      <div className="marker">
        <div style={{...icon, backgroundColor:'#FFFACD'}}></div>
        <p>Ожидает доставки</p>
      </div>
      <div className="marker">
        <div style={{...icon, backgroundColor:'#FFE4E1'}}></div>
        <p>Не доставлено</p>
      </div>
    </div>
  )
}

const icon = {
  width: '20px',
  height: '20px',
  float: 'left'
}

export default Markers

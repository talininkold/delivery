import React, { Fragment, useState, useContext } from 'react'
import FilterContext from '../Context/filterContext'

const OrderId = () => {

  const filterContext = useContext(FilterContext)

  const [id, setId] = useState('')
  const onSubmit = (e) => {
    e.preventDefault()
    filterContext.onOrderId(id)
  }

  return (
    <Fragment>
      <form onSubmit={onSubmit} style={{width:'300px'}}>
        <label htmlFor="order-id">Введите ID заказа</label>
        <input id="order-id" type="number" required onChange={e => setId(e.target.value)} value={id}/>
        <button className="btn waves-effect waves-light" type="submit">Найти</button>
      </form>
      <button 
      className="btn waves-effect waves-light" 
      style={{backgroundColor:'#DCDCDC', marginTop:'10px'}} 
      onClick={() => {filterContext.clearArchiveFilters(); setId('')}}
      >Отменить</button>
    </Fragment>
  )
}

export default OrderId

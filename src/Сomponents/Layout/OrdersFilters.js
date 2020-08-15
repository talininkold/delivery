import React, {useState, useContext} from 'react'
import FilterContext from '../Context/filterContext'

const OrdersFilters = () => {

  const filterContext = useContext(FilterContext)

  const [filter, setFilter] = useState('');
  const [param, setParam] = useState('');

  const filterOrders = (e) => {
    e.preventDefault()
    filterContext.filterOrders(filter, param)
  }

  const clearOrdersFilters = () => {
    setFilter('')
    filterContext.clearOrdersFilters()
  }
  return (
    <div id="archive-filters" style={{display:'block'}}>
      <form onSubmit={filterOrders}>
        <p>Фильтровать по параметру</p>
        <select className="browser-default" onChange={e => {setFilter(e.target.value); setParam('')}} name="filter" value={filter}>
          <option value="">Выберите параметр</option>
          <option value="name">Имя курьера</option>
          <option value="phone">Телефон курьера</option>
          <option value="id">ChatID курьера</option>
        </select>
        {filter === '' ? '' : (filter === 'name' ?
        <select className="browser-default" onChange={e => setParam(e.target.value)} name="name" value={param}>
            <option value="">Выберите курьера</option>
            {filterContext.couriers.map((courier, index) => (
                <option key={index} value={courier}>{courier}</option>
            ))}
        </select> :
        <input 
        placeholder="Введите значение..." 
        type="number" 
        className="validate"
        name='param'
        value={param}
        onChange={e => setParam(e.target.value)}
        />)}
        <button 
          className="btn waves-effect waves-light" 
          type="submit">
          Применить фильтр
        </button>
      </form>
      <button 
          className="btn waves-effect waves-light" 
          style={{backgroundColor:'#DCDCDC'}}
          onClick={clearOrdersFilters}>
          Отменить фильтр
      </button>
    </div>
  )
}

export default OrdersFilters

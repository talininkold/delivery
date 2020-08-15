import React, {useContext, Fragment} from 'react'
import FilterContext from '../Context/filterContext'
import Spinner from '../Layout/Spinner';
import Markers from '../Layout/Markers';
import OrdersFilters from '../Layout/OrdersFilters';

const Orders = () => {

  const filterContext = useContext(FilterContext)
  return (
    <div>
      <div id="header">
        <h4>Заказы</h4>
        {filterContext.orders && <button onClick={() => {filterContext.clearOrders(); filterContext.getOrders()}} className="btn waves-effect waves-light сlear" id="clear-btn">Обновить</button>}
      </div>
        {(filterContext.orders == null) ?
        <Spinner /> :
        (<Fragment>
        <OrdersFilters />
        <Markers />
        <table className="responsive-table" style={{width:'100%'}}>
          <tbody id="orders">
            {filterContext.ordersF !== null ?
            filterContext.ordersF.map((el, index) => 
            <tr key={index} style={el[8] === 'Status' ? header : (el[8] === 'Done' ? done : (el[8] === '' ? empty : other))}>
              {el.map((td, index) => (<td key={index}>{(typeof td === "object") ? td.map((i, index) => (<p key={index}>{i}</p>)) : td}</td>))} 
            </tr>) :
            filterContext.orders.map((el, index) => 
            <tr key={index} style={el[8] === 'Status' ? header : (el[8] === 'Done' ? done : (el[8] === '' ? empty : other))}>
              {el.map((td, index) => (<td key={index}>{(typeof td === "object") ? td.map((i, index) => (<p key={index}>{i}</p>)) : td}</td>))} 
            </tr> 
            )}
          </tbody>
        </table>
        </Fragment>)}
    </div>
  )
}

const done = {
  backgroundColor: '#CCFFCC'
}
const empty = {
  backgroundColor: '#FFFACD'
}
const other = {
  backgroundColor: '#FFE4E1'
}
const header = {
  backgroundColor: '#ffffff'
}

export default Orders

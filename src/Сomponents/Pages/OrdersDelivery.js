import React, {useContext} from 'react'
import FilterContext from '../Context/filterContext'
import Spinner from '../Layout/Spinner';

const OrdersDelivery = () => {

  const  {ordersD, clearOrders, getOrdersDelivery } = useContext(FilterContext)
  return (
    <div>
      <div id="header">
        <h4>Заказы на доставку</h4>
        {ordersD && <button onClick={() => {clearOrders("ordersD"); getOrdersDelivery()}} className="btn waves-effect waves-light сlear" id="clear-btn">Обновить</button>}
      </div>
        {(ordersD === null) ?
        <Spinner /> :
        (<table className="responsive-table striped" style={{width:'100%'}}>
          <tbody>
            {ordersD.map((el, index) => 
            <tr key={index}>
              {el.map((td, index) => (<td key={index}>{(typeof td === "object") ? td.map((i, index) => (<p key={index}>{i}</p>)) : td}</td>))} 
            </tr> 
            )}
          </tbody>
        </table>)}
    </div>
  )
}

export default OrdersDelivery

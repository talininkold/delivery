import React, {useContext} from 'react'
import FilterContext from '../Context/filterContext'
import Spinner from '../Layout/Spinner'
import AddCourier from '../Layout/AddCourier'

const Couriers = () => {

  const filterContext = useContext(FilterContext)

  const onMouseEnter = (e) => {
    // e.target.parentElement.style.backgroundColor = '#F8F8FF';
  }

  const onMouseLeave = (e) => {
    // e.target.parentElement.style.backgroundColor = '#ffffff';
  }

  const onDelete = (e) => {
    console.log('deleted')
    const tel = e.target.parentElement.parentElement.children[0].innerText;
    const name = e.target.parentElement.parentElement.children[1].innerText;
    const isDelete = window.confirm(`Удалить курьера - ${name} ?`);
    alert( isDelete );
    if (isDelete) {
      if (tel) {
        filterContext.onDeleteCourier(tel)
      }
      console.log('удален')
    } else {
      console.log('canceled')
    }
  }

  return (
    <div>
      <h4>Курьеры</h4>
      <AddCourier />
      {filterContext.courierPhone.length === 0 ? 
      <Spinner /> : 
      (<table className="responsive-table" style={{width:'100%'}}>
          <tbody>
            {filterContext.courierPhone.map((el, index) => 
            <tr key={index} className={index != 0 ? 'courier' : ''}>
              {el.map((td, index) => (<td key={index} style={{textAlign:'center'}}>{td}</td>))} 
              {index !== 0 ?
               <td style={icon} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}><i className="fas fa-minus-circle delete" onClick={onDelete}></i></td>
              :
               <td></td>
              }
            </tr> 
            )}
          </tbody>
        </table>)
      }
    </div>
  )
}

const icon = {
  textAlign:'right',
  padding: 0
}

export default Couriers

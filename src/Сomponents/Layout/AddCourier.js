import React, {useState, useContext} from 'react'
import FilterContext from '../Context/filterContext'

const AddCourier = () => {
  const filterContext = useContext(FilterContext)

  const [courier, setCourier] = useState({
    phone: '',
    name: ''
  })

  const {phone, name} = courier;

  const onChange = (e) => {
    setCourier({...courier, [e.target.name]: e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault();
    filterContext.addCourier(courier)
    setCourier({
      phone: '',
      name: ''
    })
    console.log('submitted')
  }

  return (
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <input id="name" type="text" className="validate" name="name" value={name} onChange={onChange}/>
            <label htmlFor="name">Имя</label>
          </div>
          <div className="input-field col s6">
            <input id="phone" type="number" className="validate" name="phone" value={phone} onChange={onChange}/>
            <label htmlFor="phone">Телефон</label>
          </div>
        </div>
        <div className="row">
          <button className="btn waves-effect waves-light" name="action" onClick={onSubmit}>Добавить курьера в базу
            <i className="material-icons right">send</i>
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCourier

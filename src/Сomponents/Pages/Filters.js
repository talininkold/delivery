import React, {useState, useContext, Fragment} from 'react';
import Table from '../Layout/Table';
import FilterContext from '../Context/filterContext'
import Spinner from '../Layout/Spinner';
import Markers from '../Layout/Markers';

const Filters = () => {

  const filterContext = useContext(FilterContext)

  // useEffect(() => {
  //   filterContext.getCouriers()
  //   // eslint-disable-next-line
  // }, [])

  const [value, setValue] = useState({
    name: '',
    phone: '',
    id: ''
  })

  const onChange = (e) => {
    setValue({...value, [e.target.name]:e.target.value});
  }

  const {name, phone, id} = value;

  const nameFilter = () => {
    filterContext.onName(name)
    clearInputs()
  }
  const phoneFilter = () => {
    filterContext.onPhone(phone)
    clearInputs()
  }
  const idFilter = () => {
    filterContext.onId(id)
    clearInputs()
  }

  const clearInputs = () => {
    setValue({name: '',
    phone: '',
    id: ''
    })
  }

  const clearFilter = () => {
    filterContext.clearFilter()
  }

  return (
    <div>
      <div id="header">
        <h4>Фильтры</h4>
        <button onClick={clearFilter} className="btn waves-effect waves-light сlear" id="clear-btn">Очистить</button>
      </div>
      <div className="filters">
        <div>
          <h6>Фильтровать по имени:</h6>
            <select className="browser-default" onChange={onChange} name="name" value={name}>
              <option value="">Выберите курьера</option>
              {filterContext.couriers.map((courier, index) => (
                  <option key={index} value={courier}>{courier}</option>
              ))}
            </select>
            <label>Выберите курьера</label>
            <button onClick={nameFilter} className="btn waves-effect waves-light" name="name_filter">Применить</button>
        </div>
        <div>
            <h6>Фильтровать по телефону:</h6>
            <input 
              placeholder="Телефон..." 
              id="phone" 
              type="number" 
              className="validate"
              name='phone'
              value={phone}
              onChange={onChange}
            />
            <label htmlFor="phone">Телефон курьера</label>
            <button onClick={phoneFilter} className="btn waves-effect waves-light" name="phone_filter">Применить</button>
        </div>
        <div>
            <h6>Фильтровать по chatID:</h6>
            <input 
              placeholder="chatID..." 
              id="id" 
              type="number" 
              className="validate" 
              name='id'
              value={id}
              onChange={onChange}
            />
            <label htmlFor="id">chatID</label>
            <button onClick={idFilter} className="btn waves-effect waves-light" name="id_filter">Применить</button>
        </div>
      </div>
      {filterContext.loading === true ? <Spinner /> : ((filterContext.array === null || filterContext.array.length === 1) ? <p style={{textAlign:'center', padding:'20px'}}>Нет данных...</p> : 
      <Fragment>
        <Markers />
        <Table/>
      </Fragment>
      )}
    </div>
  )
}

export default Filters

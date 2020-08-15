import React, {useContext, useEffect} from 'react'
import 'materialize-css/dist/css/materialize.min.css';
import {Link} from 'react-router-dom'
import FilterContext from '../Context/filterContext'
import AuthContext from '../Context/authContext/authContext'

const Navbar = () => {

  const filterContext = useContext(FilterContext)
  const authContext = useContext(AuthContext)

  const {isAuthenticated, user} = authContext;

  useEffect(() => {
    if (localStorage.param) {
      authContext.loadUser()
      filterContext.getOrders()
      filterContext.getCouriers()
    }
    // eslint-disable-next-line
  }, [localStorage.user, localStorage.param])

  return (
    <div>
      <nav className="nav-extended" style={{padding:'10px'}}>
        <div className="nav-wrapper">
          <Link to="/orders" className="brand-logo" id="logo">Сервис доставки</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>{isAuthenticated && <a type="button" onClick={() => {authContext.logOut(); filterContext.clearAll()}}>Выйти</a>}</li>
          </ul>
        </div>
        <div className="nav-content">
          {isAuthenticated && <ul className="tabs tabs-transparent">
            <li className="tab"><Link className="active" to="orders">Заказы</Link></li>
            {user === 'admin' && <li className="tab"><Link to="couriers">Курьеры</Link></li>}
            <li className="tab"><Link to="archive">Архив</Link></li>
          </ul>}
        </div>
      </nav>
    </div>
  )
}

export default Navbar

import React, {useContext} from 'react'
import FilterContext from '../Context/filterContext'

const Table = () => {

  const filterContext = useContext(FilterContext)
  return (
    <div>
      {<table className="responsive-table" style={{width:'100%'}}>
          <tbody>
            {filterContext.array.map((el, index) => 
            <tr key={index} style={el[9] === 'Status' ? header : (el[9] === 'Done' ? done : (el[9] === '' ? empty : other))}>
              {el.map((td, index) => (<td key={index}>{(typeof td === "object") ? td.map((i, index) => (<p key={index}>{i}</p>)) : td}</td>))} 
            </tr> 
            )}
          </tbody>
        </table>
      }
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


export default Table

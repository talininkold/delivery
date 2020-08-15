import React, {useContext} from 'react'
import FilterContext from '../Context/filterContext'

const Table = () => {
  const filterContext = useContext(FilterContext)

  return (
    <div>
      {<table className="responsive-table" style={{width:'100%'}}>
          <tbody id="archive">
            {filterContext.archiveF ?
             filterContext.archiveF.map((el, index) => 
            <tr key={index}>
              {el.map((td, index) => (<td key={index}>{(typeof td === "object") ? td.map((i, index) => (<p key={index}>{i}</p>)) : td}</td>))} 
            </tr> 
            ) :
            filterContext.archive.map((el, index) => 
            <tr key={index}>
              {el.map((td, index) => (<td key={index}>{(typeof td === "object") ? td.map((i, index) => (<p key={index}>{i}</p>)) : td}</td>))} 
            </tr> 
            )}
          </tbody>
        </table>
      }
    </div>
  )
}


export default Table

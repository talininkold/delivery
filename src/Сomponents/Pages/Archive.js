import React, {useState, useContext, useEffect} from 'react'
import FilterContext from '../Context/filterContext'
import TableArchive from '../Layout/TableArchive'
import Spinner from '../Layout/Spinner'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import OrderId from '../Layout/OrderId';

const Archive = () => {

  const filterContext = useContext(FilterContext)

  useEffect(() => {
    console.log('loaded')
    filterContext.clearArchive()
    // eslint-disable-next-line 
  }, [])

  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [filter, setFilter] = useState('');
  const [param, setParam] = useState('');

  const getArchive = (e) => {
    e.preventDefault()
    document.getElementById('time-wrapper').style.display = 'none';
    document.getElementById('about').style.display = 'block';
    document.getElementById('archive-filters').style.display = 'block';
    document.getElementById('order-id').style.display = 'none';
    const date1U = new Date(date1)
    const date2U = new Date(date2)
    console.log(date1)
    console.log(date1U)
    console.log(date1U.getTime())
    console.log(date2U.getTime())
    filterContext.getArchive(date1U.getTime(), date2U.getTime())
  }
  const reset = () => {
    document.getElementById('time-wrapper').style.display = 'block';
    document.getElementById('about').style.display = 'none';
    document.getElementById('archive-filters').style.display = 'none';
    document.getElementById('order-id').style.display = 'block';
    filterContext.clearArchive()
    setDate1('')
    setDate2('')
    setFilter('')
  }
  const filterArchive = (e) => {
    e.preventDefault()
    filterContext.filterArchive(filter, param)
  }

  const clearArchiveFilters = () => {
    setFilter('')
    filterContext.clearArchiveFilters()
  }

  const saveToExcel = () => {
    const wb = XLSX.utils.book_new();
          wb.Props = {
                  Title: "Archive",
                  Author: 'delivery app'
          };
        wb.SheetNames.push("Test Sheet");
        function forExcel(arr) {
          const arrCopy = JSON.parse(JSON.stringify(arr));
          for (let i = 1; i < arrCopy.length; i++) {
            let newItem = arrCopy[i][15].toString().slice(1)
            arrCopy[i][15] = newItem
          }
          return arrCopy;
        }

        function isFiltered() {
          if (filterContext.archiveF) {
            return forExcel(filterContext.archiveF)
          } else {
            return forExcel(filterContext.archive)
          }
        }
      const x = isFiltered()
      console.log(x)

      const ws_data = x;
      const ws = XLSX.utils.aoa_to_sheet(ws_data);
          wb.Sheets["Test Sheet"] = ws;
      const wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
      function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i<s.length; i++) {
          view[i] = s.charCodeAt(i) & 0xFF
        }
        return buf;
      }
      saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'test.xlsx');  
  }

  return (
    <div>
      <h4>Архив</h4>
      <div className="row">
          <div className="col s12 m12 l6">
              {filterContext.archive.length > 0 ? <button id="download" className="btn waves-effect" onClick={saveToExcel}>Cкачать таблицу</button> : ''}
              <div id="about" style={{display:'none'}}>
                <h6>{`Показана история за период с ${date1.replace('T', '  ')} по ${date2.replace('T', '  ')} `}<button onClick={reset}>Cбросить</button></h6>
              </div>
              <div id="time-wrapper">
                <form onSubmit={getArchive}>
                <label htmlFor="date1">Укажите начальную дату</label>
                <input id="date1" type="date" required onChange={e => setDate1(e.target.value)} value={date1}/>
                <label htmlFor="date2">Укажите конечную дату</label>
                <input id="date2" type="date" required onChange={e => setDate2(e.target.value)} value={date2}/>
                <button className="btn waves-effect waves-light" name="history" type="submit" style={{marginBottom:'10px'}}>Показать</button>
                </form>
              </div>
              <div id="archive-filters" style={{display:'none'}}>
                <form onSubmit={filterArchive}>
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
                    onClick={clearArchiveFilters}>
                    Отменить фильтр
                </button>
              </div>
          </div>
          <div className="col s12 m12 l6" id="order-id">
            <OrderId />
          </div>
      </div>
      {filterContext.loading === true ? <Spinner /> : ((filterContext.archive === [] || filterContext.archive.length === 1) ? <p style={{textAlign:'center', padding:'20px'}}>Нет данных...</p> : <TableArchive />)}
    </div>
  )
}

export default Archive

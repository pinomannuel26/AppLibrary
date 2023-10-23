import React, { useEffect, useState } from 'react'
import { getBooks } from '../../services/booksService';
import './home.scss';


const Home = () => {
  const [books, setBooks]= useState([]);
  const [categories, setCategories] = useState([]);
  const [ragePages, setRagePages] = useState({
    min:0,
    max:1000,
    step: 10
  });
  const [filters,setFilters] = useState({});
  /** estado que nos va aguardar el resultado del filtrado*/
  const [resultFiltrado, setResultFiltrado] = useState([]);
  /*respuuesta cuando no se encuentran los libros */
  const [responseFilter, setResponseFilter] = useState('');
  useEffect(()=>{
      getBooks().then((response)=>{
        /**. then, se ejhucuta cuando la respuesta de la promesa fue satisfactia
         * entonces si la proesa retorna los datos solicitados, antualizamos 
         * nuestro estado con esos datops
        */
        setBooks(response);
        console.log(response);
        /**optener las categorias */
        const categoriesList = getCategories(response);
        setCategories(categoriesList);
        /**obtener el umero max y minino de paginas de los libros */
        const numPages= getPages(response);
        setRagePages({...ragePages, ...numPages});/*que guarde una copia del estado y que actualize solo lo q tenga q actualizar, los nuevos valores */

      })
  },[])

  //funcion que permita extraer las categorias de los deneros de los libros
  const getCategories = (booksList) =>
  {
    const categoriesList= booksList.map((item)=>item.book.genre);
    const categoryItems = new Set(categoriesList); /**PARA QUE NO SE REPITAN LOS DATOS */
    console.log('categorias', [...categoryItems]);
    return [...categoryItems];
  }

  //funcions para optener el min y max de paginas de los libros
  const getPages = (bookList) =>{
    const range = bookList.map((item) => item.book.pages);

    return {min:Math.floor(Math.min(...range)/1000)*1000, max:Math.ceil(Math.max(...range)/1000)*1000}
  }

  //FUNCION PARA EXTRAER LOS VALORES DE LOS FILTROS +
  const onFilter = (event) =>{
 
    const {name, value} = event['target']; /** al ponerlo en corchetes podemos trabajar el onj como un array */
    const filterParamps = {...filters, [name]: value};
    setFilters(filterParamps);
    console.log(filterParamps);
    if(value)
    {
      let copiaBooks = [...books];
      for(const key in filterParamps)
      {
        if(filterParamps[key])
        {
          const filteredResult =  key === 'pages' ? copiaBooks.filter((element) => element.book[key] <= filterParamps[key] ) :copiaBooks.filter((element)=> element.book[key]== filterParamps[key]);
          copiaBooks = [...filteredResult];
        }
      }
      console.log('copiaBooks', copiaBooks);
      setResultFiltrado(copiaBooks);
      setResponseFilter(()=>copiaBooks.length? '' :'Nose encontraron resultados');
    }else{
      setResultFiltrado([]);
      setResponseFilter('Filtro limpiado');
    }
    

  }

  return (
    <main>
      <section className='filterContainer'>
        <div>
          <label > Filtar por página</label>
          <input type="range" min={ragePages.min} max={ragePages.max} step={ragePages.step} onChange={onFilter} name='pages' value={filters.pages}/>
        </div>
        <div>
          <label > Filtar por género</label>
          <select name="genre" onChange={onFilter} value={filters.genre}>
            <option value={''}>Todas</option>
            {
              categories.length>0? categories.map((item, index)=> <option key={index} value={item} > {item}</option>):<></>
            }
          </select>
        </div>
      </section>
        {
        responseFilter&& <h2>{responseFilter}</h2>
        
        /*si books no esta bacio, vamos a recorrerlo y r cada libre imprimimos su imagen
        en un etiqueta figure */}
        
      <section className='cardContainer'>
        {
          resultFiltrado.length > 0 ? resultFiltrado.map((items, index) => 
          <figure key={index}>
            <img src={items.book.cover} alt={items.book.title} />
          </figure>):
          books.length> 0? books.map((items, index) => 
            <figure key={index}>
              <img src={items.book.cover} alt={items.book.title} />
            </figure>): <div>...Cargando</div>
        }
      </section>
       
    </main>
  )
}

export default Home
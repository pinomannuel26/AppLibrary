import React, { useEffect, useState } from 'react'
import { getBooks } from '../../services/booksService';
import './home.scss';


const Home = () => {
  const [books, setBooks]= useState([]);
  useEffect(()=>{
      getBooks().then((response)=>{
        /**. then, se ejhucuta cuando la respuesta de la promesa fue satisfactia
         * entonces si la proesa retorna los datos solicitados, antualizamos 
         * nuestro estado con esos datops
        */
        setBooks(response);
        console.log(response);
      })
  },[])
  return (
    <main>
      <section className='filterContainer'>
        <div>
          <label > Filtar por página</label>
          <input type="range" min={0} max={100} step={10}/>
        </div>
        <div>
          <label > Filtar por género</label>
          <select name="" >
            <option value={''}>Todas</option>
          </select>
        </div>
      </section>
        {/*si books no esta bacio, vamos a recorrerlo y r cada libre imprimimos su imagen
        en un etiqueta figure */}
      <section className='cardContainer'>
        {
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
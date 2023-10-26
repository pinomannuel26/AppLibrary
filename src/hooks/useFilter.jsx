import { useState } from "react";

const useFilter=(initialValues={})=>{ /**LE ESTAMOS DICIENDO QUE VA A SER OPCIONAL SI RECIVE O NO PARAMETROS, pues si no le indico nada, por defecto va a ser vacio */
    const [filters,setFilters] = useState(initialValues);
    /** estado que nos va aguardar el resultado del filtrado*/
    const [resultFiltrado, setResultFiltrado] = useState([]);
    /*respuuesta cuando no se encuentran los libros */
    const [responseFilter, setResponseFilter] = useState('');

    const handleFilter=(event, bookList) => {
        const {name, value} = event['target']; /** al ponerlo en corchetes podemos trabajar el onj como un array */
        const filterParamps = {...filters, [name]: value};
        setFilters(filterParamps);

       
        let copiaBooks = [...bookList];
        for(const key in filterParamps)
        {
            if(filterParamps[key])
            {
                const filteredResult =  !(isNaN(filterParamps[key])) ? copiaBooks.filter((element) => element.book[key] <= filterParamps[key] ) :copiaBooks.filter((element)=> element.book[key]== filterParamps[key]);
                copiaBooks = [...filteredResult];
            }
        }
        setFilters(filterParamps);
        setResultFiltrado(copiaBooks);
        setResponseFilter(()=>copiaBooks.length? '' :'Nose encontraron resultados');
    }
    return {filters, resultFiltrado, responseFilter, setFilters, handleFilter}
}
export default useFilter;
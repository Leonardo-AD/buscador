import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './styles.css'
import { api } from './services/api'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  // começa como um objeto vazio

  async function handleSearch(){

    if(input === ''){
      
      MySwal.fire({
        title: "Não foi possível fazer a busca",
        text: "Por favor, digite algum CEP.",
        icon: "error"
      })

      return
    }

    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)

      setInput('')
    }
    catch{
      MySwal.fire({
        title: "Oops... Erro ao buscar",
        text: "Por favor, digite um CEP válido.",
        icon: "error"
      })

      setInput("")
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="input-container">

        <input
          type="text"
          placeholder="Digite um CEP"
          value={ input }
          onChange = {(event) => setInput(event.target.value)}
        />

      <button className="search-button" onClick={ handleSearch }> <FiSearch size={25} color="#FFF"/></button>

      </div>

      {Object.keys(cep).length > 0 && (
        
        <main className='main' id='cep-content'>
        <h2>CEP: {cep.cep}</h2>

          <div className='result'>
            <p><span>Logradouro: </span>{cep.logradouro}</p>
            <p><span>Bairro: </span>{cep.bairro}</p>
            <p><span>Cidade: </span>{cep.localidade} - {cep.uf}</p>
            <p><span>DDD: </span>{cep.ddd}</p>
          </div>

        </main>
      )}

    </div>
  );
}
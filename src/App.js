import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './styles.css'
import { api } from './services/api'

export function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  // começa como um objeto vazio

  async function handleSearch(){

    if(input === ''){
      alert("Por favor, digite algum CEP!")
      return
    }

    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    }
    catch{
      alert("Oops... Erro ao buscar.")
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
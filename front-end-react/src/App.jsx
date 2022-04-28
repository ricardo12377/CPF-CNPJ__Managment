import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {AiOutlineSearch, AiOutlineFileAdd} from 'react-icons/ai'
import style from  './App.module.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Button from './components/button/button';
import { messageHelper } from './helpers/messageHelper';
import { baseUrl } from './api/url';

function App() {

  // States
  const [modal, setModal] = useState(false)
  const [procurar, setProcurar] = useState("")
  const [registers, setRegisters] = useState([])
  const [addType, setAddType] = useState("")
  const [addCode, setAddCode] = useState(0)
  const [addisBlocked, setAddisBlocked] = useState(false)
  const [editable, setEditable] = useState({
    type: "",
    code: 0,
  })

  // Função para formatar o texto com . , - , / e atribuir o valor a variavel usada pra filtrar
    async function formatSearch (e) {
      const item = e.target.value
      const formated = await item.replace(/\.|-/g,"")

      await setProcurar(formated)
    }
    
  // Função que adiciona um registro no banco, usada expressão regular(regex) para filtrar o - . / digitado.
  function HandleSubmit(e) {
    e.preventDefault()
    const formatedCode = addCode.replace(/\.|-/g,"")

    const data = {
      type: addType,
      code: formatedCode,
      isBlocked: addisBlocked
    }

    axios.post(baseUrl, data)
    .then(() => alert(messageHelper.succes))
    .then(() => document.location.reload(true))
  }

  // Toda vez que o site abrir ele vai carregar todos os registros usando o useEffect.
  useEffect(() => {
    axios.get(baseUrl)
      .then((response) => setRegisters(response.data))
  }, [])

  // Essa função irá pegar o item selecionado para editar ele.
  function GetForEdit(param) {
    axios.get(baseUrl + param)
      .then((response) => setEditable(response.data))
  }

  // Com essa função, irá mudar qualquer valor alterado nos inputs de edição.
  const onInputChange = e => {
    setEditable({ ...editable, [e.target.name]: e.target.value })
  };

  // No onSubmit, irá pegar a variavel editada do item selecionado e mudar o valor original no banco de dados.
  const onSubmit = async e => {
        e.preventDefault();
        await axios.put(baseUrl + editable.id, editable);
        document.location.reload(true)
  };

  // Essa função leva o item para a block list.
  const MakeBlocked = async (e, id) => {
      e.preventDefault();

      await axios.put(baseUrl + id, {isBlocked: true});
      document.location.reload(true)
  };

  // Essa função leva o item para a lista de não block.
const MakeNoBlocked = async (e, id) => {
      e.preventDefault();

      await axios.put(baseUrl + id, {isBlocked: false});
      document.location.reload(true)
};

// Essa função deleta um registro no banco.
function HandleDelete(id) {
  axios.delete(baseUrl + id)
  .then(() => alert(messageHelper.succes))
  document.location.reload(true)
}

// Nas linhas 154 e 204 estão as funções e como eu fiz para tratar do filtro de items.

  return (
    <div className={style.App}>
      <Header />
      <main className={style.body}>
      {modal ? (
          <form className={style.add} onSubmit={(e) => HandleSubmit(e)}>
            <label htmlFor='type'>
              Type :
              <select name='type' onChange={(e) => setAddType(e.target.value)}>
                <option>select</option>
                <option value="cpf">cpf</option>
                <option value="cnpj">cnpj</option>
              </select>
            </label>

            <label htmlFor='isBlocked'>
              isBlocked :
              <select name='isBlocked' onChange={(e) => setAddisBlocked(e.target.value)}>
                <option value="false">false</option>
                <option value="true">true</option>
              </select>
            </label>

            <label className='code'>
              Code :
              <input type="text" onChange={(e) => setAddCode(e.target.value)}/>
            </label>

           <button type='submit'>Add Code</button>
           <button onClick={() => setModal(false)}>Close</button>
          </form>
        ) : null}
        <div className={style.box}  data-testid="box-element">
          <header>
            
            <div className={style.addAction} onClick={() => setModal(true)}>
            <Button text="Add" onClick={() => setModal(true)}/>
            <AiOutlineFileAdd size={25} />
            </div>
            <em>Not Blockeds</em>

            <div>
              <AiOutlineSearch size={25} />
              <input type="number" placeholder="Tip a number" onChange={(e) => formatSearch(e)}/>
            </div>
          </header>

          <body className={style.lista}  data-testid="body-element">
          {registers &&
            registers.filter((item) => {
              if(procurar === ""){
                return item
              } if (item.code.toLowerCase().includes(procurar.toLowerCase())) {
                return item
              }
            }).map((item) => {
              if (item.isBlocked === false) {
                return (
                  <div key={item.id} className={style.card}>
                    <div className={style.infos}>
                      <em>Code: {item.code}</em>
                      <div>Type: {item.type}</div>
                    </div>

                    <div className={style.actions}>
                      <button onClick={() => HandleDelete(item.id)}>
                        Delete
                      </button>

                      <button onClick={() => GetForEdit(item.id)}>
                        Edit
                      </button>

                      <button onClick={(e) => MakeBlocked(e, item.id)}>
                        Block / UnBlock
                      </button>
                    </div>
                  </div>
                )
              }
              return null
            })}
          </body>
        </div>

        <div className={style.box}>
        <header>
            <em>Blockeds</em>

            <div>
              <AiOutlineSearch size={25} />
              <input type="number" placeholder="Tip a number" onChange={(e) => formatSearch(e)}/>
            </div>
          </header>

          <body className={style.lista}>
          {registers &&
            registers.filter((item) => {
              if(procurar === ""){
                return item
              } if (item.code.toLowerCase().includes(procurar.toLowerCase())) {
                return item
              }
            }).map((item) => {
              if (item.isBlocked === true) {
                return (
                  <div key={item.id} className={style.card}>
                    <div className={style.infos}>
                      <em>Code: {item.code}</em>
                      <div>Type: {item.type}</div>
                    </div>

                    <div className={style.actions}>
                      <button onClick={() => HandleDelete(item.id)}>
                        Delete
                      </button>

                      <button>
                        Edit
                      </button>

                      <button onClick={(e) => MakeNoBlocked(e, item.id)}>
                        Block / UnBlock
                      </button>
                    </div>
                  </div>
                )
              }
              return null
            })}
          </body>
          <form onSubmit={(e) => onSubmit(e)} className={style.edit} data-testid="form-edit-element">
              <label htmlFor="type">
                Type :
                <input value={editable.type} type="text" name='type' onChange={e => onInputChange(e)}/>
              </label>

              <label htmlFor="code">
                Code :
                <input value={editable.code} name="code" type="number" onChange={e => onInputChange(e)}/>
              </label>

              <button>Edit</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;

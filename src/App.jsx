import { useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import Filtros from "./components/Filtros";

import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generarID } from "./helpers";
function App() {

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) :  [])
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  //escucha los cambios de edicion
  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      handleNuevoGasto()
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos))
  }, [gastos])


  useEffect(() => {
    if(filtro){
      const gastosSelect = gastos.filter(gastoState => gastoState.categoria === filtro) 
      setGastosFiltrados(gastosSelect);
    }

  }, [filtro])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto'))
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  const handleNuevoGasto = () => {
    setModal(true)
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {

    if(gasto.id){
      //editando
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
    } else{
      //nuevo gasto
      gasto.id = generarID()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }

    setAnimarModal(false);

		setTimeout(() => {
			setModal(false);
		}, 500);

  }

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id)
    setGastos(gastosActualizados)
  }

	return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

    {isValidPresupuesto && (
      <>
        <main>
          <Filtros 
            filtro={filtro}
            setFiltro={setFiltro}
          />
          <ListadoGastos 
            gastos={gastos}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
            setModal={setModal}
            setAnimarModal={setAnimarModal}
            eliminarGasto={eliminarGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
            setGastosFiltrados={setGastosFiltrados}
          />
        </main>
        <div className="nuevo-gasto">
          <img 
            src={IconoNuevoGasto} 
            alt="nuevo-gasto" 
            onClick={handleNuevoGasto}
            />
        </div>
      </>
      )}

    {modal && <Modal 
      modal={modal}
      setModal={setModal}
      animarModal={animarModal}
      setAnimarModal={setAnimarModal}      
      guardarGasto={guardarGasto}
      gastoEditar={gastoEditar}
      setGastoEditar={setGastoEditar}
    />}

    </div>
  )
}

export default App;

import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { formatearCantidad } from "../helpers"

export default function ControlPresupuesto({setPresupuesto, presupuesto, gastos, setGastos, setIsValidPresupuesto}) {

  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  const [porcentaje, setPorcentaje] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => total + gasto.cantidad, 0)

    const totalDisponible = presupuesto - totalGastado
    setDisponible(totalDisponible)
    setGastado(totalGastado)
    //procentaje gastado


    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2) 
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1000);
  }, [gastos])

  const handleResetApp = () => {
    const resultado = confirm('Deseas resetear la app?')
    if(resultado){
      setGastos([])
      setPresupuesto('')
      setIsValidPresupuesto(false)
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar 
          value={porcentaje} text={`${porcentaje}% Gastado`} styles={buildStyles({
            pathColor: porcentaje > 100 ? 'red': '#3b82f6' ,
            trailColor: '#f5f5f5',
            textColor:  porcentaje > 100 ? 'red': '#3b82f6'
          })}
        />
        
      </div>
      <div className="contenido-presupuesto">

        <button 
          className="reset-app"
          type="button"
          onClick={handleResetApp}
          >
          Resetear App
        </button>
        <p>
          <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
        </p>
        <p className={disponible < 0 ? 'negativo' : ''}>
          <span>Disponible:</span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado:</span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  )
}

import { useEffect, useState } from "react"

export default function Filtros({filtro, setFiltro}) {
  return (
    <div className="filtros contenedor sombra">
      <form>
        <div className="campo">
          <label htmlFor="filtrar">Filtrar Gastos</label>
            <select 
              id="filtrar"
              value={filtro}
              onChange={e => setFiltro(e.target.value) }
              >
              <option value="">--Seleccione--</option>
              <option value="ahorro">Ahorro</option>
              <option value="casa">Casa</option>
              <option value="comida">Comida</option>
              <option value="gastos">Gastos Varios</option>
              <option value="ocio">Ocio</option>
              <option value="salud">Salud</option>
              <option value="suscripciones">Suscripciones</option>
            </select>
          </div>
      </form>
    </div>
  )
}

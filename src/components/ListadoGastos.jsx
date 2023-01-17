import Gasto from "./Gasto";

export default function ListadoGastos({
	gastos,
	gastoEditar,
	setGastoEditar,
	setModal,
	setAnimarModal,
  eliminarGasto,
	filtro,
	gastosFiltrados,
}) {
	return (
		<div className="contenedor">
			<div className=" listado-gastos">

				
				{filtro ? (
					<>
						{gastosFiltrados.length > 0 ? <h2>Gastos de {filtro} </h2> : <h2>No hay gastos de {filtro} </h2>}

						{gastosFiltrados.map((gasto) => (
							<Gasto
								key={gasto.id}
								gasto={gasto}
								gastoEditar={gastoEditar}
								setGastoEditar={setGastoEditar}
								setModal={setModal}
								setAnimarModal={setAnimarModal}
								eliminarGasto={eliminarGasto}
							/>
						))}	
					</>
				) : (
					<>
					{gastos.length > 0 ? <h2>Gastos</h2> : <h2>No hay gastos aún</h2>}
					{gastos.map((gasto) => (
						<Gasto
							key={gasto.id}
							gasto={gasto}
							gastoEditar={gastoEditar}
							setGastoEditar={setGastoEditar}
							setModal={setModal}
							setAnimarModal={setAnimarModal}
							eliminarGasto={eliminarGasto}
						/>
					))}
					</>
				)}

			</div>
		</div>
	);
}

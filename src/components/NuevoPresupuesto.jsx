import { useState } from "react";
import Mensaje from "./Mensaje";

export default function NuevoPresupuesto({
	presupuesto,
	setPresupuesto,
	isValidPresupuesto,
	setIsValidPresupuesto,
}) {
	const [mensaje, setMensaje] = useState("");

	const handlePresupuesto = (e) => {
		e.preventDefault();

		if (!presupuesto || presupuesto <= 0) {
			setMensaje("No es un presupuesto valido");
			return;
		}
		setMensaje("");
    console.log(typeof presupuesto);
    setIsValidPresupuesto(true)
	};

	return (
		<div className="contenedor-presupuesto contenedor sombra">
			<form className="formulario" onSubmit={handlePresupuesto}>
				<div className="campo">
					<label htmlFor="presupuesto">Definir Presupuesto</label>

					<input
						type="number"
						placeholder="Inserta un presupuesto"
						className="nuevo-presupuesto"
						value={presupuesto}
						onChange={(e) => setPresupuesto(parseInt(e.target.value))}
					/>
				</div>

				<input type="submit" value={"Agregar presupuesto"} />
				{mensaje && <Mensaje tipo={"error"}>{mensaje} </Mensaje>}
			</form>
		</div>
	);
}

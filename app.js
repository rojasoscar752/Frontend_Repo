// Creacion de una cita teniendo en cuenta los datos del usuario 
document.getElementById('crearCitaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('cc', document.getElementById('cc').value);
    formData.append('fecha', document.getElementById('fecha').value);
    formData.append('foto', document.getElementById('foto').files[0]);
  //
    const response = await fetch('/crear-cita', {
      method: 'POST',
      body: formData
    });
  
    const result = await response.json();
    // aqui mostramos el código de la cita al crearla
    document.getElementById('resultadoCita').innerText = `Cita creada - Código: ${result.codigo}`;
  });
  
  // metodo para consultar citas medicas teniendo en cuenta 2 fecahs en rango
  document.getElementById('consultarCitasForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
  
    const response = await fetch(`/consultar-citas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
    const citas = await response.json();
  
    let output = '';
    citas.forEach(cita => {
      output += `
        <p>Código de Cita: ${cita.codigo}<br>
        Cédula: ${cita.cc}, Fecha: ${cita.fecha}, Cancelada: ${cita.cancelada ? 'Sí' : 'No'}<br>
        <img src="${cita.foto}" alt="foto" width="200"></p>`;
    });
  
    document.getElementById('resultadoConsulta').innerHTML = output;
  });
  
  // Cancelacion de una cita por codigo unico
  document.getElementById('cancelarCitaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const codigo = document.getElementById('codigo').value;
  
    const response = await fetch(`/cancelar-cita/${codigo}`, {
      method: 'DELETE'
    });
  
    const result = await response.json();
    // Mostramos el resultado de la cancelación de la cita
    document.getElementById('resultadoCancelacion').innerText = result.mensaje;
  });
  
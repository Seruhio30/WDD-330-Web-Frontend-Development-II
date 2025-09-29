const baseURL = import.meta.env.VITE_SERVER_URL;
console.log('Base URL:', baseURL);

async function convertToJson(res) {
  const jsonResponse = await res.json(); // Convertir el cuerpo a JSON primero

  if (res.ok) {
    return jsonResponse; // Si está OK, devolver el JSON
  } else {
    // Si no está OK, lanzar un objeto personalizado con nombre y mensaje
    throw {
      name: 'servicesError',
      message: jsonResponse
    };
  }
}

export default class ExternalServices {
  async getData(category) {
    const url = `${baseURL}products/search/${encodeURIComponent(category)}`;
    console.log('GET products URL:', url);
    const response = await fetch(url);
    const data = await convertToJson(response);
    console.log('API getData result:', data);
    console.log('Primer producto:', data.Result[0]);
    console.log('ID del primer producto:', data.Result[0].Id);
    return data.Result ?? [];
  }

  async findProductById(id) {
    const url = `${baseURL}product/${encodeURIComponent(id)}`;
    console.log('GET product by id URL:', url);
    const response = await fetch(url);
    const data = await convertToJson(response);
    console.log('API findProductById result:', data);
    return data.Result ?? data;
  }

  async checkout(payload) {
    const url = `${baseURL}checkout`;
    console.log('POST checkout URL:', url);
    console.log('Payload:', payload);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    };

    const response = await fetch(url, options);
    const data = await convertToJson(response);
    console.log('Checkout response:', data);
    return data;
  }
}

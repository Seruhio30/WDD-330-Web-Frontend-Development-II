const baseURL = import.meta.env.VITE_SERVER_URL;
console.log('Base URL:', baseURL);

function convertToJson(res) {
  if (res.ok) return res.json();
  throw new Error(`Bad Response: ${res.status}`);
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

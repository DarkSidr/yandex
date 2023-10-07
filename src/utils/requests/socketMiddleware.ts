export const socketMiddleware = () => {
  const test = new WebSocket("wss://norma.nomoreparties.space/orders/all");
  test.onopen = (event) => {
    console.log("onopen", event);
  };

  test.onerror = (event) => {
    console.log("onclose", event);
  };

  test.onmessage = (event) => {
    const { data } = event;
    const parsedData = JSON.parse(data);
    const { success, ...restParsedData } = parsedData;

    console.log("onmessage", restParsedData);
  };

  test.onclose = (event) => {
    console.log("onclose", event);
  };
};

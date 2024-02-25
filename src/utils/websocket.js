// const WS_HOST = window.location.host;

// process.env.BASE_URL

const WS_HOST = '192.168.11.220:4000';

export default {
  listen(url, cb, closeCB, openCb, errorCB) {
    const ws = new WebSocket(`ws://${WS_HOST}/${url}`);

    ws.onopen = () => {
      if (openCb) openCb();
    };

    ws.onclose = () => {
      if (closeCB) closeCB();
    };

    ws.onerror = () => {
      if (errorCB) errorCB();
      if (closeCB) closeCB();
    };

    ws.onmessage = (event) => {
      const reader = new FileReader();
      reader.readAsText(event.data, 'utf-8');
      reader.onload = () => {
        try {
          const { result } = reader;
          const data = result && JSON.parse(result);
          cb(data);
        } catch (e) {
          console.log(e);
        }
      };
    };

    return ws;
  },
};

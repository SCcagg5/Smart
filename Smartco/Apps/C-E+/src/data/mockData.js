import store from '../redux/store';

export function getStocksByStockName(stockName) {
  const nameUpper = stockName.toUpperCase();
  const stocks = [];
  const state = store.getState();
  state.stocks.stocksArray.map(data => {
    if (data.title.toUpperCase().includes(nameUpper)) {
      stocks.push(data);
    }
  });
  return stocks;
}

export function getCryptoByCryptoName(cryptoName) {
  const nameUpper = cryptoName.toUpperCase();
  const crypto = [];
  const state = store.getState();
  state.crypto.cryptoArray.map(data => {
    if (data.title.toUpperCase().includes(nameUpper)) {
      crypto.push(data);
    }
  });
  return crypto;
}

export function getStockById(id) {
  var item;
  const state = store.getState();
  state.stocks.stocksArray.map(data => {
    if (data.id == id) {
      item = data;
    }
  });
  return item;
}

export function getCryptoById(id) {
  var item;
  const state = store.getState();
  state.crypto.cryptoArray.map(data => {
    if (data.id == id) {
      item = data;
    }
  });
  return item;
}

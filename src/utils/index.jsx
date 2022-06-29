
export const getFileBuffer = async (file) => {
  return new Promise((res, rej) => {
    // create file reader
    let reader = new FileReader();

    // register event listeners
    reader.addEventListener('loadend', (e) => res(e.target.result));
    reader.addEventListener('error', rej);

    // read file
    reader.readAsArrayBuffer(file);
  });
};
export const getTokenId = (transaction) => {
  // for (const event of transaction.events) {
  //   if (event.event !== 'Transfer') {
  //     continue;
  //   }

  //   return event.returnValues.tokenId.toString();
  // }
  return parseInt(transaction.events[1].topics[1].toString(10), 16);
  throw new Error('Unable to get token id');
};
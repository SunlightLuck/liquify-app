import { ethers } from 'ethers'
import { CHAIN_IDS } from '../config';

const onConnect = async () => {
    if (window.ethereum) {
        const chainId = Number(await window.ethereum.request({ method: 'eth_chainId' }));
        if (!CHAIN_IDS.includes(chainId)) {

            const data = [{
                chainId: '0x61',
                chainName: 'BSC Mainnet',
                nativeCurrency:
                {
                    name: 'BNB',
                    symbol: 'BNB',
                    decimals: 18
                },
                rpcUrls: ['https://bsc-dataseed2.binance.org/'],
                blockExplorerUrls: ['https://bscscan.com/'],
            }];
            try {
                const tx = await window.ethereum.request({ method: 'wallet_addEthereumChain', params: data });
            }
            catch (error) {
                console.log(error);
            }
            return null;
        }
        else {
            try {
                await window.ethereum.enable();
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                console.log(accounts);
                // window.web3 = new Web3(window.ethereum);
                return accounts[0];
            } catch (error) {
                console.log(error);
            }
        }
    }
};
export default onConnect;
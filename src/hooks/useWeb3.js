import TonWeb from 'tonweb';



const BN = TonWeb.utils.BN;
const toNano = TonWeb.utils.toNano;

const providerUrl = 'https://testnet.toncenter.com/api/v2/jsonRPC';
const apiKey = '9d3e42ecad4110e05084be39b30cd6e1e30ea7c67777a8c2c434ba3fa29cd0b1';
const tonweb = new TonWeb(new TonWeb.HttpProvider(providerUrl, { apiKey }));

const useWeb3 = () => {

    const getBalance = async (walletAddress) => {

    };



    return { getBalance };
};

export default useWeb3;

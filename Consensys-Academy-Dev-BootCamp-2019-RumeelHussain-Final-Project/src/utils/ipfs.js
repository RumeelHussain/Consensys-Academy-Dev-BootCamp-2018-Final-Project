import IPFS from 'ipfs-api';
import ipfsConst from '../constants/ipfs';

const ipfs = new IPFS({ host: ipfsConst.host, port: ipfsConst.port, protocol: ipfsConst.protocol});

export default ipfs;
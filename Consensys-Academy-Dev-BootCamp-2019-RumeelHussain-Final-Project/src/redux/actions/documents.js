import documentsType from "../type/documents";
import contract from "../../constants/contracts";
import get from "lodash/get";
import ipfsConst from '../../constants/ipfs';
import ipfs from "../../utils/ipfs";

export function verifiers(payload) {
  return function(dispatch) {
    dispatch({type: documentsType.verifiers});
    let count = 0;
    contract.accounts.verifiersCount({from: payload.account})
      .then((res)=>{
        count = get(res, 'c[0]', 0);
        const promises = [];
        for(let index = 0; index < count; index++){
          promises.push(contract.accounts.getVerifier(index, {from: payload.account}))
        }
        return Promise.all(promises);
      })
      .then((res)=>{
        const verifiers = [];
        for(const verifier of res){
          verifiers.push({
            address: verifier[0],
            name: verifier[1],
            email: verifier[2],
            image: ipfsConst.url + verifier[3],
            description: verifier[4],
            type: verifier[5].c[0],
            price: verifier[6].c[0]
          });
        }
        dispatch({type: documentsType.verifiersDone, payload: verifiers});
      })
      .catch((err)=>{
        dispatch({type: documentsType.verifiersRejected, payload: err})
      });
  }
}

export function create(payload) {
  return function(dispatch) {
    dispatch({type: documentsType.create});
    let ipfsHash;
    ipfs.add(payload.document)
      .then((res) => {
        ipfsHash = get(res, '[0].hash', '');
        if(!ipfsHash){
          throw new Error('IPFS file upload error occurred');
        }
        return contract.documents.addDocument.estimateGas(payload.verifier, payload.name, payload.description, ipfsHash, {from: payload.account, value: payload.rate});
      })
      .then((gas)=>{
        return contract.documents.addDocument(payload.verifier, payload.name, payload.description, ipfsHash, {from: payload.account, gasLimit: gas, value: payload.rate});
      })
      .then(()=>{
        const documentAddedEvent = contract.documents.DocumentAdded();
        documentAddedEvent.watch((error) => {
          if (error){
            throw new Error('Account Register event has error occurred');
          }
          dispatch({type: documentsType.createDone});
        });
      })
      .catch((err)=>{
        dispatch({type: documentsType.createRejected, payload: err})
      });
  }
}

export function requesterDocs(payload) {
  return function(dispatch) {
    dispatch({type: documentsType.requesterDocs});
    const promises = [];
    for(let index = 0; index < payload.total; index++){
      promises.push(contract.documents.getRequesterDocuments(payload.account, index, {from: payload.account}))
    }
    Promise.all(promises)
      .then((res)=>{
        const docs = [];
        for(const doc of res){
          docs.push({
            name: doc[0],
            verifier: doc[1],
            description: doc[2],
            address: doc[3],
            link: ipfsConst.url + doc[3],
            status: doc[4].c[0]
          });
        }
        dispatch({type: documentsType.requesterDocsDone, payload: docs});
      })
      .catch((err)=>{
        dispatch({type: documentsType.requesterDocsRejected, payload: err})
      });
  }
}
export function verifierDocs(payload) {
  return function(dispatch) {
    dispatch({type: documentsType.verifierDocs});
    const promises = [];
    for(let index = 0; index < payload.total; index++){
      promises.push(contract.documents.getVerifierDocuments(payload.account, index, {from: payload.account}))
    }
    Promise.all(promises)
      .then((res)=>{
        const docs = [];
        for(const doc of res){
          docs.push({
            name: doc[0],
            verifier: doc[1],
            description: doc[2],
            docAddress: doc[3],
            link: ipfsConst.url + doc[3],
            status: doc[4].c[0]
          });
        }
        dispatch({type: documentsType.verifierDocsDone, payload: docs});
      })
      .catch((err)=>{
        dispatch({type: documentsType.verifierDocsRejected, payload: err})
      });
  }
}
export function verifyDoc(payload) {
  return function(dispatch) {
    dispatch({type: documentsType.verifyDocs});
    contract.documents.verifyDocument.estimateGas(payload.docAddress, payload.status, {from: payload.account})
      .then((gas)=> {
        return contract.documents.verifyDocument(payload.docAddress, payload.status, {from: payload.account, gasLimit: gas})
      }).then(() => {
        const documentVerifiedEvent = contract.documents.DocumentVerified();
        documentVerifiedEvent.watch((error) => {
          if (error){
            throw new Error('Document verify event has error occurred');
          }
          dispatch({type: documentsType.verifyDocsDone});
        });
      })
      .catch((err)=>{
        dispatch({type: documentsType.verifyDocsRejected, payload: err})
      });
  }
}

export function getDocument(payload) {
  return function(dispatch) {
    dispatch({type: documentsType.getDoc});
    contract.documents.getDocument(payload.docAddress, {from: payload.account})
      .then((res) => {
        const requester = get(res, '[1]');
        const verifier = get(res, '[2]');
        const invalid = requester === "0x0000000000000000000000000000000000000000" || verifier === "0x0000000000000000000000000000000000000000";
        const doc = {
          name: get(res, '[0]', ''),
          requester: requester,
          verifier: verifier,
          status: get(res, '[4].c[0]', false),
          link: ipfsConst.url + payload.docAddress,
          valid: !invalid
        };
        dispatch({type: documentsType.getDocDone, payload: doc});
      })
      .catch((err)=>{
        dispatch({type: documentsType.getDocRejected, payload: err})
      });
  }
}
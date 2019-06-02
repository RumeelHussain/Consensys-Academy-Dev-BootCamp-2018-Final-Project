import documents from '../type/documents';

export default function reducer(state={
  verifiers: [],
  requesterDocs: [],
  verifierDocs: [],
  loading: false,
  document: {},
  error: null,
}, action) {
  switch (action.type) {
    case documents.verifiers: {
      return {...state, loading: true}
    }
    case documents.verifiersRejected: {
      return {...state, loading: false, error: action.payload}
    }
    case documents.verifiersDone: {
      return {
        ...state,
        loading: false,
        verifiers: action.payload
      }
    }
    case documents.create: {
      return {...state, loading: true}
    }
    case documents.createRejected: {
      return {...state, loading: false, error: action.payload}
    }
    case documents.createDone: {
      return {
        ...state,
        loading: false
      }
    }
    case documents.requesterDocs: {
      return {...state, loading: true}
    }
    case documents.requesterDocsRejected: {
      return {...state, loading: false, error: action.payload}
    }
    case documents.requesterDocsDone: {
      return {
        ...state,
        loading: false,
        requesterDocs: action.payload
      }
    }
    case documents.verifierDocs: {
      return {...state, loading: true}
    }
    case documents.verifierDocsRejected: {
      return {...state, loading: false, error: action.payload}
    }
    case documents.verifierDocsDone: {
      return {
        ...state,
        loading: false,
        verifierDocs: action.payload
      }
    }
    case documents.verifyDocs: {
      return {...state, loading: true}
    }
    case documents.verifyDocsRejected: {
      return {...state, loading: false, error: action.payload}
    }
    case documents.verifyDocsDone: {
      return {
        ...state,
        loading: false
      }
    }
    case documents.getDoc: {
      return {...state, loading: true}
    }
    case documents.getDocRejected: {
      return {...state, loading: false, error: action.payload}
    }
    case documents.getDocDone: {
      return {
        ...state,
        loading: false,
        document: action.payload
      }
    }
  }
  return state;
}

import { combineReducers } from "redux"

import user from "./user"
import documents from "./documents"

export default combineReducers({
  user,
  documents
})

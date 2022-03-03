import { SET_CURRENT_USER } from "../Actions/Auth.actions";
import isEmpty from "../../assets/common/Is-empty";

export default function (state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        iseAuthenticated: !isEmpty(action.payload), // TODO
        user: action.payload,
        userProfile: action.userProfile,
      };

    default:
      return state;
  }
}

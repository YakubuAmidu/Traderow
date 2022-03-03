import { SET_CURRENT_USER } from "../Actions/Auth.actions";

export default function (state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        iseAuthenticated: [], // TODO
        user: action.payload,
        userProfile: action.userProfile,
      };

    default:
      return state;
  }
}

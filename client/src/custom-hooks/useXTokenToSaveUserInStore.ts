import {constructUserFromId, getPayloadFromJwt} from "../utils/utils";
import {authService} from "../auth/authService";

export const useXTokenToSaveUserInStore = (xToken: string | null) => {
	constructUserFromId(getPayloadFromJwt(xToken)?.sub)
		?.then(user => {
			authService.storeUserInState(user);
		})
		.catch(e => console.log(e));
};

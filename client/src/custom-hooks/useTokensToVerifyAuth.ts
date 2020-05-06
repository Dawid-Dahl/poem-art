import {useEffect} from "react";
import {authService} from "../auth/authService";
import {ValidOrRefreshedXToken} from "../types/types";

export const useTokensToVerifyAndRefresh = (
	xToken: string | null,
	xRefreshToken: string | null
): Promise<ValidOrRefreshedXToken | null> => {
	return new Promise((resolve, reject) => {
		useEffect(() => {
			if (!xToken) {
				console.log("Verifying server side!");

				authService
					.verifyXRefreshTokenServerSide(xRefreshToken)
					.then(res => {
						if (res.isVerified) {
							authService.refreshXToken(res.refreshedXToken);
							resolve(res.refreshedXToken);
						} else {
							reject(null);
						}
					})
					.catch(e => (console.log(e), reject(null)));
			}

			if (!xRefreshToken) {
				reject(null);
			}

			if (authService.isClientSideXTokenValid(xToken)) {
				resolve(xToken);
			} else {
				console.log("Verifying server side!");

				authService
					.verifyXRefreshTokenServerSide(xRefreshToken)
					.then(res => {
						if (res.isVerified) {
							authService.refreshXToken(res.refreshedXToken);
							resolve(res.refreshedXToken);
						} else {
							reject(null);
						}
					})
					.catch(e => (console.log(e), reject(null)));
			}
		});
	});
};

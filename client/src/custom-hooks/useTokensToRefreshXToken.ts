import {useEffect} from "react";
import {authService} from "../auth/authService";
import {RefreshedXToken} from "../types/types";

/** This hook takes a xToken/xRefreshToken-pair and uses them for verification.
 *
 * Always returns a refreshed x-token if x-refresh-token is valid.
 *
 * Otherwise returns null.
 */
export const useTokensToRefreshXToken = (
	xToken: string | null,
	xRefreshToken: string | null
): Promise<RefreshedXToken> => {
	return new Promise((resolve, reject) => {
		useEffect(() => {
			if (location.pathname === "/register" || location.pathname === "/login") {
				return;
			} else {
				if (!xToken) {
					console.log("Verifying server side!");

					authService
						.verifyXRefreshTokenServerSide(xRefreshToken)
						.then(res => {
							if (res.isVerified) {
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

				console.log("Verifying server side!");

				authService
					.verifyXRefreshTokenServerSide(xRefreshToken)
					.then(res => {
						if (res.isVerified) {
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

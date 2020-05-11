import {useTokensToRefreshXToken} from "./useTokensToRefreshXToken";

/** This hook takes a xToken/xRefreshToken-pair and refreshes the x-token if x-refresh-token is valid. Then attaches the refreshed x-token to the outgoing fetch request.
 *
 * Returns a refreshAndFetch function.
 *
 * Returns null if something went wrong.
 */
export const useRefreshAndFetch = (
	xToken: string | null,
	xRefreshToken: string | null,
	url: string,
	{method, headers, body}: RequestInit
): Promise<Response> => {
	return fetch(url, {
		method: method,
		headers,
		body,
	});
};

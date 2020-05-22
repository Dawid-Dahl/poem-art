import {refreshAndSetXToken} from "../utils/utils";

export const apiService = {
	async refreshAndFetch(url: string) {
		await refreshAndSetXToken(localStorage.getItem("x-refresh-token"));

		try {
			const res = await fetch(`${process.env.MAIN_FETCH_URL}/api/${url}`, {
				headers: {
					"x-token": localStorage.getItem("x-token") ?? "null",
				},
			});

			return await res.json();
		} catch (e) {
			console.log(e);
		}
	},
};


export const getStorage = () => {
	const data = localStorage.getItem('settings');
		let settings;

		if (data)
			settings = JSON.parse(data);


		return settings;
}

export const setStorage = ( settings: any) => {
  localStorage.setItem('settings', JSON.stringify(settings));
}

export const clearStorage = () => {
  localStorage.removeItem('settings');
}

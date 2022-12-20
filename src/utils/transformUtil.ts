/**
 * 将json对象转为url
 * @param json
 */
export function json2url(json: Object) {
	if (!json) return '';
	return clearArray(
		Object.keys(json).map(key => {
			if (json[key] === undefined) return '';
			return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
		})
	).join('&')
}

export function clearArray(actual) {
	const newArray = [] as any;
	for (let i = 0; i < actual.length; i++) {
		if (actual[i]) {
			newArray.push(actual[i]);
		}
	}
	return newArray;
}

import request from '/@/utils/request';

export const reviewFileUrl = '';

export function postAction(url: string, data: any, state: boolean = true) {
	return request({
		url,
		method: 'post',
		data,
		state
	})
}

export function getAction(url: string, data: any, state: boolean = true) {
	return request({
		url: url,
		method: 'get',
		data,
		state
	})
}

export function uploadAction(url: string, data: any) {
	return request({
		url,
		method: 'post',
		data,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

export function ArrayBufferAction(url: string) {
	return request({
		url,
		method: 'get',
		responseType: 'arraybuffer'
	})
}

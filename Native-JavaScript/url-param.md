###### 获取hash或者search参数值
````js
/**
 * 获取hash或者search参数值
 * @param paramName
 * @returns {any}
 */
export const getParam = (paramName: string, url?: any) => {
	const searchResult = (new URL(url) || window.location)?.search?.substr(1);
	const hashResult = (new URL(url) || window.location)?.hash?.substr(2);
	const result: any = searchResult + "&" + hashResult?.split("?")?.[1];
	const reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)");
	return result.match(reg) !== null ? decodeURI(result?.match(reg)[2]) : null;
};
````

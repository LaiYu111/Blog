import { useCallback } from 'react';

// 定义 useNav 钩子，不接受初始参数
const useNav = () => {
	// 返回一个 navigate 函数，这个函数接受一个 url 参数
	const navigate = useCallback((url) => {
		// 使用 window.open 在新标签页中打开给定的URL
		window.open(window.location.origin + url, '_blank');
	}, []); // 依赖项为空，因为 navigate 函数不依赖于外部变量

	const pageRouter = useCallback((url) => {
		window.open(url, '_blank')
	}, [])

	return {navigate, pageRouter};
}

export default useNav;

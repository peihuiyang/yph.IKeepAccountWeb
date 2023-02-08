// 解决Uni-app在Vue3跨域问题
import {
	defineConfig
} from "vite"
import uni from "@dcloudio/vite-plugin-uni";
 
export default defineConfig({
	plugins: [
		uni()
	],
	server: {
		proxy: {
			'/api/ika': {
				target: 'http://106.13.10.198:8080',
				changeOrigin: true,
				rewrite: path => {
					return path.replace(/^\/api/, '/TT/api')
				}
			}
		}
	}
})
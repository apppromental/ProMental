import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	routes: [
		{
			path: '/home',
			name: 'Home',
			component: () => 
					import(/* webpackChunkName: "home" */ './screens/Home')
		},
		{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/formScreenData',
			name: 'FormScreenData',
			component: () => 
					import(/* webpackChunkName: "formScreenData" */ './screens/FormScreenData')
		},
		{
			path: '/quizScreen',
			name: 'QuizScreen',
			component: () => 
					import(/* webpackChunkName: "quizScreen" */ './screens/QuizScreen')
		},
	]
})

Vue.config.productionTip = false

new Vue({
	router,
	vuetify,
	render: h => h(App)
}).$mount('#app')

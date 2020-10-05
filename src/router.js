import Vue from 'vue'
import Router from 'vue-router'
const Dashboard = () => import('@/views/Dashboard')
const Clientes = () => import('@/views/Clientes')
const Servicos = () => import('@/views/Servicos')

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [

        {
            path: '/dashboard', component: Dashboard,
            children: [
                {
                    path: 'clientes',
                    component: Clientes
                },
                {
                    path: 'servicos',
                    component: Servicos
                }
            ],
        },


        { path: '', redirect: '/dashboard' }
    ]
})
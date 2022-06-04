import { createRouter, createWebHistory } from 'vue-router';
import Home from "./components/Home.vue";
import Product from "./components/Product.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product',
    name: 'product',
    component: Product,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

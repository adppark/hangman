import { createRouter, createWebHistory } from 'vue-router';

import startPage from '@/views/startPage';
import selectCardPage from '@/views/selectCardPage';
import gamePage from '@/views/gamePage';
import optionPage from '@/views/optionPage';

const routes = [
  { path: '/', name: 'main', component: startPage },
  { path: '/2', name: 'second', component: selectCardPage },
  { path: '/3', name: 'third', component: gamePage, props: true },
  { path: '/option', name: 'option', component: optionPage, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };

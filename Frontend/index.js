import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(VueRouter)
Vue.use(Vuex)

import App from './components/App.vue'

import Accounts from './components/Accounts.vue'
import Transactions from './components/Transactions.vue'
import SelectedAccount from './components/SelectedAccount.vue'
import AddEditAccount from './components/AddEditAccount.vue'
import AddEditTransaction from './components/AddEditTransaction.vue'

const router = new VueRouter({
  routes: [
    { path: '/accounts', name: 'Accounts', component: Accounts },
    { path: '/accounts/:id', name: 'SelectedAccount', component: SelectedAccount, props: true },
    { path: '/accounts/add', name: 'AddAccount', component: AddEditAccount, props: true },
    { path: '/accounts/:id/edit', name: 'EditAccount', component: AddEditAccount, props: true },
    { path: '/transactions', name: 'Transactions', component: Transactions },
    { path: '/transactions/add', name: 'AddTransaction', component: AddEditTransaction, props: true },
    { path: '/transactions/:id/edit', name: 'EditTransaction', component: AddEditTransaction, props: true },
    { path: '*', redirect: '/accounts' }
  ]
})

const state = {
  accounts: [],
  transactions: [],
  selectedAccountTransactions: [],
  selectedAccount: {
    uuid: null,
    number: null,
    name: null,
    created: null
  }
}

const store = new Vuex.Store({
  state
})

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  components: {
    App
  },
  template: '<App />'
})

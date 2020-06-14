<template>
  <table>
    <thead>
      <tr>
        <th class="title" colspan="4">
          <h1>{{ title }}</h1>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="option" v-bind:style="toggleTabs == true ? { backgroundColor: '#CCC' } : { backgroundColor: '#FFF' }" v-on:click="goTo('/accounts/')">
          Accounts
        </td>
        <td class="option" v-bind:style="toggleTabs == true ? { backgroundColor: '#FFF' } : { backgroundColor: '#CCC' }" v-on:click="goTo('/transactions/')">
          Transactions
        </td>
        <td class="space" />
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    created() {
      if (this.$router.currentRoute.path.includes('accounts')) {
        this.toggleTabs = true
      } else {
        this.toggleTabs = false
      }
    },
    data() {
      return {
        title: "OverVue: Money",
        toggleTabs: null
      }
    },
    methods: {
      goTo(path) {
        this.$router.replace({ path: path })
        this.toggle()
      },
      toggle() {
        if (this.$router.currentRoute.path.includes('accounts')) {
          this.toggleTabs = true
        } else {
          this.toggleTabs = false
        }
      }
    }
  }
</script>

<style scoped>
  table {
    border-collapse: collapse;
    width: 640px;
    font-family: Verdana;
    table-layout: fixed;
  }
  td.option {
    padding: 4px 4px 4px 4px;
    background-color: #DDD;
    border-radius: 16px 16px 0px 0px;
    font-size: 18px;
    font-weight: normal;
    text-align: center;
  }
  td.space {
    background-color: #FFF;
  }

  a:link {
    text-decoration: none;
    color: #333;
  }
  a:visited {
    text-decoration: none;
    color: #333;
  }
  a:hover {
    text-decoration: none;
    color: #999;
  }
  a:active {
    text-decoration: none;
    color: #999;
  }
</style>

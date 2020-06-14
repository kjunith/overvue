<template>
  <table class="content">
    <thead>
      <tr>
        <th class="content" colspan="3">
          {{ info }}
        </th>
        <th class="addAccount" colspan="2">
          <button class="addAccount" type="button" v-on:click="addAccount()">Add Account</button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text">Number</td>
        <td class="text" colspan="2">Name</td>
        <td class="textRight">Created</td>
        <td class="textRight" />
      </tr>
      <template v-for="account in this.$store.state.accounts">
        <tr class="data">
          <td>{{ account.number }}</td>
          <td colspan="2">{{ account.name }}</td>
          <td class="dataRight">{{ account.created }}</td>
          <td>
            <button class="details" type="button" v-on:click="goToAccount(account)">Details</button>
            <button class="remove" type="button" v-on:click="deleteAccount(account)">Remove</button>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
  export default {
    created() {
      this.fetchAccounts(),
      this.fetchTransactions()
    },
    data() {
      return {
        info: "Accounts Information"
      }
    },
    methods: {
      fetchAccounts() {
        console.log('Accounts - Fetching All Accounts');
        fetch('http://localhost:3000/accounts')
          .then(response => response.json())
          .then(result => {
            this.$store.state.accounts = result
          })
          .catch(error => {
            this.error = error
            console.error("Accounts - Error:", error)
          })
      },
      fetchTransactions() {
        console.log('Accounts - Fetching All Transactions');
        fetch('http://localhost:3000/transactions')
          .then(response => response.json())
          .then(result => {
            this.$store.state.transactions = result
          })
          .catch(error => {
            this.error = error
            console.error("Accounts - Error:", error)
          })
      },
      addAccount() {
        console.log('Accounts - Posting Account');
        this.$router.push({ name: "AddAccount" })
      },
      goToAccount(account) {
        console.log('Accounts - SelectedAccount: ' + account.uuid);

        // TODO: Set selectedAccount Here?
        this.$store.state.selectedAccount = account

        this.$router.push({ name: "SelectedAccount", params: { id: account.uuid } })
      },
      deleteAccount(account) {
        if (confirm('Do you want to completly remove ' + account.name + '?')) {
          console.log('Accounts - Deleting Account: ' + account.name);
          fetch('http://localhost:3000/accounts/' + account.uuid, {
              method: 'DELETE'
            })
            .then(() => {
              this.fetchAccounts()
            })
        }
      }
    }
  }
</script>

<style scoped>
  table.content {
    border-collapse: collapse;
    background-color: #CCC;
    font-family: Verdana;
    table-layout: fixed;
    width: 100%;
  }
  th.content {
    font-size: 18px;
    padding: 16px;
    text-align: left;
  }
  th.addAccount {
    background-color: #CCC;
    padding-right: 16px;
    text-align: right;
  }

  td.text {
    font-size: 14px;
    background-color: #EEE;
    font-weight: bold;
    padding: 4px 4px 4px 4px;
  }
  td.textRight {
    text-align: right;
    font-size: 14px;
    background-color: #EEE;
    font-weight: bold;
    padding: 4px 4px 4px 4px;
  }

  tr.data {
    text-indent: 2px;
    font-size: 12px;
    background-color: #FFF;
    border-bottom: #DDD solid 1px;
  }
  tr.data:hover {
    background-color: #EEE;
  }
  td.dataRight {
    padding-right: 4px;
    text-align: right;
  }

  td.space {
    background-color: #FFF;
  }

  button.addAccount {
    background-color: blue;
    border: none;
    border-radius: 8px;
    color: #FFF;
    font-size: 12px;
    margin-left: auto;
    margin-right: auto;
    opacity: 0.5;
    padding: 4px;
    transition: 0.3s;
    width: 50%;
  }
  button.addAccount:hover {
    opacity: 1
  }

  button.details {
    float: left;
    background-color: blue;
    border: none;
    border-radius: 8px;
    color: #FFF;
    font-size: 12px;
    opacity: 0.5;
    transition: 0.3s;
    text-align: center;
    height: 24px;
    width: 50%;
  }
  button.details:hover {
    opacity: 1
  }

  button.remove {
    float: right;
    background-color: red;
    border: none;
    border-radius: 8px;
    color: #FFF;
    font-size: 12px;
    opacity: 0.5;
    text-align: center;
    transition: 0.3s;
    height: 24px;
    width: 50%;
  }
  button.remove:hover {
    opacity: 1
  }
</style>

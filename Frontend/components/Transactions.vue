Transactions<template>
  <table class="content">
    <thead>
      <tr>
        <th class="content" colspan="5">
          {{ info }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text">Account</td>
        <td class="text">Title</td>
        <td class="textRight">Price</td>
        <td class="textRight">Date</td>
        <td class="textRight" />
      </tr>
      <template v-for="transaction in $store.state.transactions">
        <tr class="data">
          <td>{{ transaction.account }}</td>
          <td>{{ transaction.title }}</td>
          <td class="dataRight">{{ transaction.price }} Kr</td>
          <td class="dataRight">{{ transaction.date }}</td>
          <td>
            <button class="edit" type="button" v-on:click="goToTransaction(transaction)">Edit</button>
            <button class="remove" type="button" v-on:click="deleteTransaction(transaction)">Erase</button>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
  export default {
    created() {
      this.fetchTransactions()
    },
    data() {
      return {
        info: "Transactions Information"
      }
    },
    methods: {
      fetchTransactions() {
        fetch('http://localhost:3000/transactions')
          .then(response => response.json())
          .then(result => {
            this.$store.state.transactions = result
          })
          .catch(error => {
            this.error = error
            console.error("Error:", error)
          })
      },
      deleteTransaction(transaction) {
        if (confirm('Delete ' + transaction.title + '?')) {
          console.log('Deleting: ' + transaction.title);
          fetch('http://localhost:3000/transactions/' + transaction.uuid, {
              method: 'DELETE'
            })
            .then(() => {
              this.fetchTransactions()
            })
        }
      },
      postTransaction() {
        console.log('Posted Transaction');
        fetch('http://localhost:3000/transactions/', {
            method: 'POST'
          })
          .then(() => {
            this.fetchTransactions()
          })
      },
      goToTransaction(transaction) {
        this.$router.push({ name: 'EditTransaction', params: { id: transaction.uuid, title: transaction.title, price: transaction.price } })
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

  button.edit {
    float: left;
    background-color: blue;
    border: none;
    border-radius: 8px;
    color: #FFF;
    font-size: 12px;
    opacity: 0.5;
    transition: 0.3s;
    height: 24px;
    width: 50%;
  }
  button.edit:hover {
    opacity: 1
  }

  button.remove {
    float: right;
    background-color: red;
    border: none;
    border-radius: 8px;
    color: #FFF;
    font-size: 12px;
    text-align: center;
    opacity: 0.5;
    transition: 0.3s;
    height: 24px;
    width: 50%;
  }
  button.remove:hover {
    opacity: 1
  }
</style>

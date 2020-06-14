<template>
  <table class="content">
    <thead>
      <tr>
        <th class="name" colspan="2">
          {{ this.$store.state.selectedAccount.name }}
        </th>
        <th class="number" colspan="2">
          ({{ this.$store.state.selectedAccount.number }})
        </th>
        <th class="options">
          <button class="editAccount" type="button" v-on:click="editAccount()">Edit Account</button>
          <button class="addTransaction" type="button" v-on:click="addTransaction()">Add Transaction</button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text">#</td>
        <td class="text">Title</td>
        <td class="textRight">Price</td>
        <td class="textRight">Date</td>
        <td class="textRight" />
      </tr>
      <template v-for="(transaction, index) in this.$store.state.selectedAccountTransactions">
        <tr class="data">
          <td>{{ index + 1 }}</td>
          <td>{{ transaction.title }}</td>
          <td class="dataRight">{{ transaction.price }} Kr</td>
          <td class="dataRight">{{ transaction.date }}</td>
          <td class="options">
            <button class="details" type="button" v-on:click="editTransaction(transaction)">Details</button>
            <button class="remove" type="button" v-on:click="deleteTransaction(transaction)">Remove</button>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: ['id'],
    created() {
      console.log(this.id);

      this.fetchAccount()
      this.fetchTransactions()
    },
    data() {
      return {
        account: null
      }
    },
    methods: {
      fetchAccount() {
        console.log('SelectedAccount - Selected ID: ' + this.id);
        fetch('http://localhost:3000/accounts/' + this.id)
          .then(response => response.json())
          .then(result => {
            console.log('SelectedAccount - Fetched Account: ', result[0]);
            this.$store.state.selectedAccount = result[0]
          })
          .catch(error => {
            this.error = error
            console.error("SelectedAccount - Error:", error)
            alert('Error: ', error)
          })
      },
      fetchTransactions() {
        console.log('SelectedAccount - Selected Transactions: ' + this.$store.state.selectedAccount.number);

        fetch('http://localhost:3000/transactions/' + this.id)
          .then(response => response.json())
          .then(result => {
            this.$store.state.selectedAccountTransactions = result
          })
          .catch(error => {
            this.error = error
            console.error("SelectedAccount - Error:", error)
            alert('Error: ', error)
          })
      },
      addTransaction() {
        console.log('SelectedAccount - Posting Transaction');
        this.$router.push({ name: "AddTransaction" })
      },
      editTransaction(transaction) {
        console.log('SelectedAccount - Edit Transaction: ' + transaction.uuid);
        console.log('SelectedAccount - TITLE: ', transaction.title);
        console.log('SelectedAccount - PRICE: ', transaction.price);

        let id = transaction.uuid
        let title = transaction.title
        let price = transaction.price

        this.$router.push({ name: "EditTransaction", params: { id: id, title: title, price: price } })
      },
      deleteTransaction(transaction) {
        console.log('SelectedAccount - Deleting Transaction: ' + transaction.uuid);

        if (confirm('Do you want to completly remove ' + transaction.title + '?')) {
          fetch('http://localhost:3000/transactions/' + transaction.uuid, {
              method: 'DELETE'
            })
            .then(() => {
              this.fetchTransactions()
            })
            .catch(error => {
              this.error = error
              console.error("SelectedAccount - Error:", error)
              alert('Error: ', error)
            })
        }
      },
      editAccount() {
        console.log('SelectedAccount - Edit Account: ' + this.id);
        console.log('SelectedAccount - UUID: ', this.$store.state.selectedAccount.uuid);
        console.log('SelectedAccount - NAME: ', this.$store.state.selectedAccount.name);

        let number = this.$store.state.selectedAccount.number
        let name = this.$store.state.selectedAccount.name

        this.$router.push({ name: "EditAccount", params: { id: this.id, name: name, number: number } })
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
  th.options {
    padding-right: 16px;
  }
  th.name {
    font-size: 18px;
    padding: 16px;
    text-align: left;
  }
  th.number {
    font-size: 18px;
    padding: 16px;
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

  button.editAccount {
    background-color: #FFF;
    border: none;
    border-radius: 8px;
    color: #333;
    font-size: 12px;
    margin-left: auto;
    margin-right: auto;
    opacity: 0.5;
    padding: 4px;
    transition: 0.3s;
    width: 100%;
  }
  button.editAccount:hover {
    opacity: 1
  }

  button.addTransaction {
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
    width: 100%;
  }
  button.addTransaction:hover {
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

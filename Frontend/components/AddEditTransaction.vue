<template>
  <table class="content">
    <thead>
      <tr>
        <th class="info" colspan="5">
          {{ info }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="data">
        <td class="title" colspan="2">
          <label>Title:</label><br />
          <input class="title" placeholder="Title" v-model="inputTitle"/>
        </td>
        <td class="price" colspan="3">
          <label >Price:</label><br />
          <input class="price" placeholder="####" v-model="inputPrice" />
        </td>
      </tr>
      <tr class="options">
        <td />
        <td class="options" colspan="3">
          <button class="save" type="button" v-on:click="buttonAction()">Save</button>
          <button class="cancel" type="button" v-on:click="cancel()">Cancel</button>
        </td>
        <td />
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: ['id', 'title', 'price'],
    created() {
      if (this.$router.currentRoute.name == 'EditTransaction') {
        this.inputTitle = this.title
        this.inputPrice = this.price
        console.log('AddEdit - EditTransaction');
      } else {
        console.log('AddEdit - AddTransaction');
      }
    },
    data() {
      return {
        info: 'Add/Edit Transaction',
        inputTitle: '',
        inputPrice: ''
      }
    },
    methods: {
      addTransaction() {
        console.log('AddEdit - Posting Transaction');
        console.log('Title: ', this.inputTitle);
        console.log('Price: ', this.inputPrice);

        let accountUuid = this.$store.state.selectedAccount.uuid
        let account = this.$store.state.selectedAccount.number

        fetch('http://localhost:3000/transactions/add/?accountUuid=' + accountUuid + '&account=' + account + '&title=' + this.inputTitle + '&price=' + this.inputPrice, {
            method: 'POST'
          })
          .then(result => {
            alert('Transaction Added!')
            this.$router.go(-1)
          })
          .catch(error => {
            this.error = error
            console.error("AddEdit - Error:", error)
            alert('Error: ', error)
          })
      },
      updateTransaction() {
        console.log('AddEdit - Updating Transaction');
        console.log('Uuid: ', this.id);
        console.log('Title: ', this.inputTitle);
        console.log('Price: ', this.inputPrice);

        fetch('http://localhost:3000/transactions/?uuid=' + this.id + '&title=' + this.inputTitle + '&price=' + this.inputPrice, {
            method: 'PUT'
          })
          .then(result => {
            alert('Transaction Updated!')
            this.$router.go(-1)
          })
          .catch(error => {
            this.error = error
            console.error("AddEdit - Error:", error)
            alert('Error: ', error)
          })
      },
      buttonAction() {
        switch (this.$router.currentRoute.name) {
          case 'AddTransaction':
            console.log('AddTransaction');
            this.addTransaction()
            break;
          case 'EditTransaction':
            this.updateTransaction()
            break;
          default:
            break;
        }
      },
      cancel() {
        this.$router.go(-1)
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
  th.info {
    font-size: 18px;
    padding: 16px;
    text-align: left;
  }
  tr.data {
    background-color: #EEE;
  }
  td.title {
    font-size: 18px;
    padding: 16px;
    text-align: left;
  }
  td.price {
    font-size: 18px;
    padding: 16px;
    text-align: left;
  }
  tr.options {
    background-color: #FFF;
  }
  td.options {
    padding: 16px;
    vertical-align: bottom;
  }

  input {
    font-size: 14px;
  }

  button.save {
    float: left;
    background-color: green;
    border: none;
    border-radius: 8px;
    color: #FFF;
    font-size: 12px;
    opacity: 0.5;
    transition: 0.3s;
    height: 24px;
    width: 50%;
  }
  button.save:hover {
    opacity: 1
  }

  button.cancel {
    float: left;
    background-color: red;
    border: none;
    border-radius: 8px;
    color: #FFF;
    font-size: 12px;
    opacity: 0.5;
    transition: 0.3s;
    height: 24px;
    width: 50%;
  }
  button.cancel:hover {
    opacity: 1
  }
</style>

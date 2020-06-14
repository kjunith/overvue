<template>
  <table class="content">
    <thead>
      <tr>
        <th class="content" colspan="5">
          {{ info }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="data">
        <td class="name" colspan="2">
          <label>Name:</label><br />
          <input class="name" placeholder="Account Name" v-model="inputName"/>
        </td>
        <td class="number" colspan="3">
          <template v-if="newAccount">
            <label >Number:</label><br />
            <input class="number" placeholder="########" v-model="inputNumber" />
            <button class="generate" type="button" v-on:click="generateNumber()" >Generate Number</button>
          </template>
        </td>
      </tr>
      <tr class="options">
        <td colspan="2" />
        <td class="options">
          <button class="save" type="button" v-on:click="buttonAction()">Save</button>
          <button class="cancel" type="button" v-on:click="cancel()">Cancel</button>
        </td>
        <td colspan="2" />
      </tr>
    </tbody>
  </table>
</template>

<script>
  const uuidv4 = require('uuid/v4')

  export default {
    props: ['id', 'name', 'number'],
    created() {
      if (this.$router.currentRoute.name == 'EditAccount') {
        this.inputName = this.name
        this.inputNumber = this.number
        console.log('AddEdit - EditAccount');
        console.log('AddEdit - UUID: ', this.id);
      } else {
        this.newAccount = true
        console.log('AddEdit - AddAccount');
      }
    },
    data() {
      return {
        info: 'Add/Edit Account',
        uuid: null,
        newAccount: false,
        currentUuid: '',
        inputNumber: '',
        inputName: ''
      }
    },
    methods: {
      addAccount() {
        console.log('AddEdit - Posting Account');
        this.uuid = uuidv4()
        console.log('UUID: ', this.uuid);

        fetch('http://localhost:3000/accounts/add/?uuid=' + this.uuid + '&number=' + this.inputNumber + '&name=' + this.inputName, {
            method: 'POST'
          })
          .then(result => {
            alert('Account Added!')
            this.$router.push({ name: "SelectedAccount", params: { id: this.uuid } })
          })
          .catch(error => {
            this.error = error
            console.error("AddEdit - Error:", error)
            alert('Error: ', error)
          })
      },
      updateAccount() {
        console.log('AddEdit - Updating Account');
        console.log('Current UUID: ', this.id);

        fetch('http://localhost:3000/accounts/?uuid=' + this.id + '&number=' + this.inputNumber + '&name=' + this.inputName, {
            method: 'PUT'
          })
          .then(result => {
            alert('Account Updated!')
            this.$router.push({ name: "SelectedAccount", params: { id: this.id } })
          })
          .catch(error => {
            this.error = error
            console.error("AddEdit - Error:", error)
            alert('Error: ', error)
          })
      },
      buttonAction() {
        switch (this.$router.currentRoute.name) {
          case 'AddAccount':
            this.addAccount()
            break;
          case 'EditAccount':
            this.updateAccount()
            break;
          default:
            break;
        }
      },
      cancel() {
        switch (this.$router.currentRoute.name) {
          case 'AddAccount':
            console.log('AddEdit - Canceled Add Account');
            this.$router.go(-1)
            break;
          case 'EditAccount':
            console.log('AddEdit - Canceled Edit Account');
            this.$router.push({ name: 'SelectedAccount', params: { id: this.id }})
            break;
          default:
            break;
        }
      },
      generateNumber() {
        this.inputNumber = Math.floor(Math.random() * 90000000) + 10000000;
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
  tr.data {
    background-color: #EEE;
  }
  td.name {
    font-size: 18px;
    padding: 16px;
    text-align: left;
  }
  td.number {
    font-size: 18px;
    padding: 16px;
    text-align: left;
  }
  td.generate {
    font-size: 12px;
    padding: 16px;
    text-align: left;
  }
  tr.options {
    background-color: #FFF;
  }
  td.options {
    padding-top: 16px;
    vertical-align: bottom;
  }

  input {
    font-size: 14px;
  }

  button.generate {
    text-align: left;
    background-color: blue;
    border: none;
    border-radius: 8px;
    color: #FFF;
    font-size: 12px;
    opacity: 0.5;
    transition: 0.3s;
    height: 24px;
  }
  button.generate:hover {
    opacity: 1
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

<template>
  <h1>VMail Inbox</h1>
  <div id="vmail">
    <SuspenseWithError>
      <template #default>
        <MailTable />
      </template>
      <template #fallback>
        Requesting from server...
      </template>
      <template #error>
        <b>Server unreachable for some reason!</b>
        <p>see console</p>
        <i>database probably isn't running</i>
      </template>
    </SuspenseWithError>
  </div>
</template>

<script>
  import SuspenseWithError from './components/SuspenseWithError.vue';
  import MailTable from './components/MailTable.vue';
  export default {
    components: {
      MailTable,
      SuspenseWithError,
    },
  };
</script>

<style lang="scss">
  #Vmail {
    #vmail {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
    }

    /* Global Styles */

    button {
      font-size: 16px;
      padding: 8px;
      border-radius: 3px;
      margin: 5px 10px 5px 0px;
      cursor: pointer;

      &:disabled {
        cursor: auto;
      }

      &.selected {
        cursor: auto;
        color: black;
        border-color: black;
        border-width: 2px;
      }
    }

    .clickable {
      cursor: pointer;
    }

    input[type=checkbox] {
      -webkit-appearance: none;
      cursor: pointer;
      width: 24px;
      height: 24px;
      background: white;
      border-radius: 2px;
      border: 1px solid #555;
      position: relative;
      vertical-align: middle;
      padding: 10px;

      &.partial-check {
        background: #abc;
      }
      &:checked {
        background: #679;
      }
    }

    .mb-0 {
      margin-bottom: 0;
    }

    /* Modal */

    .modal,
    .overlay {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
    }
    .overlay {
      opacity: 0.5;
      background-color: black;
    }
    .modal-card {
      position: relative;
      max-width: 80%;
      margin: auto;
      margin-top: 30px;
      padding: 20px;
      background-color: white;
      min-height: 500px;
      z-index: 10;
      opacity: 1;
    }

    /* Email Modal */

    .email-display {
      text-align: left;
    }

    .mail-table {
      max-width: 1000px;
      margin: auto;
      border-collapse: collapse;

      tr.read {
        background-color: #eee;
      }
      tr {
        height: 40px;
      }
      td {
        border-bottom: 1px solid black;
        padding: 5px;
        text-align: left;
      }
      tr:first-of-type td {
        border-top: 1px solid black;
      }
      td p {
        max-height: 1.2em;
        overflow-y: hidden;
        margin: 0;
      }
      td.date {
        width: 120px;
      }
    }

    .bulk-action-bar {
      width: 100%;
      max-width: 1000px;
      margin: auto;
      text-align: left;
      padding-bottom: 8px;

      input {
        margin: 5px;
      }
      .checkbox {
        margin-right: 6px;
        margin-left: 3px;
      }
    }
  }
</style>

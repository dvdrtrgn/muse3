<template>
  <div>
    <span class="buttons">
      <button :disabled="view == 'inbox'" @click="setView('inbox')">Inbox View</button>
      <button :disabled="view == 'archive'" @click="setView('archive')">Archive View</button>
    </span>
  </div>
  <BulkActionBar :emails="viewEmails" />
  <table class="mail-table">
    <tbody>
      <tr
        v-for="email in viewEmails"
        :key="email.id"
        :class="['clickable', email.read ? 'read' : '']"
      >
        <td>
          <input
            type="checkbox"
            :checked="emailSelection.emails.has(email)"
            @click="emailSelection.toggle(email)"
          />
        </td>
        <td>{{ email.from }}</td>
        <td @click="openEmail(email)">
          <p>
            <strong>{{ email.subject }}</strong> - {{ email.body }}
          </p>
        </td>
        <td class="date">{{ format(new Date(email.sentAt), "MMM do yyyy") }}</td>
        <td><button @click="archiveEmail(email)">Archive</button></td>
      </tr>
    </tbody>
  </table>
  <ModalView v-if="openedEmail" @closeModal="openedEmail = null">
    <MailView :email="openedEmail" @changeEmail="changeEmail" />
  </ModalView>
</template>

<script>
import { ref } from "vue";
import { format } from "date-fns";
import axios from "axios";

import MailView from "../components/MailView.vue";
import ModalView from "../components/ModalView.vue";
import BulkActionBar from "../components/BulkActionBar.vue";
import useEmailSelection from "../composables/useEmailSelection";

export default {
  components: { MailView, ModalView, BulkActionBar },
  async setup() {
    let { data: emails } = await axios.get("http://localhost:3000/emails");
    const data = {
      format,
      emails: ref(emails),
      openedEmail: ref(null),
      emailSelection: useEmailSelection(),
      view: ref("inbox")
    };
    return data;
  },
  computed: {
    sortedEmails() {
      return this.sort();
    },
    viewEmails() {
      if (this.view === "archive") {
        return this.sortedEmails.filter(e => e.archived);
      } else {
        return this.sortedEmails.filter(e => !e.archived);
      }
    }
  },
  methods: {
    sort() {
      return this.emails.sort((e1, e2) => {
        return e1.sentAt < e2.sentAt ? 1 : -1;
      });
    },
    setView(str) {
      this.view = str;
      this.emailSelection.clear();
    },
    changeEmail(data) {
      let email = this.openedEmail;
      let emails = this.viewEmails;

      if (data.toggleRead) email.read = !email.read;
      if (data.toggleArchive) email.archived = !email.archived;
      if (data.closeModal) this.openedEmail = null;
      if (data.save) this.updateEmail(email);
      if (data.changeIndex) {
        let idx = emails.indexOf(email) + data.changeIndex;
        let newEmail = emails[idx];
        this.openEmail(newEmail);
      }
    },
    openEmail(email) {
      this.openedEmail = email;
      if (email) {
        email.read = true;
        this.updateEmail(email);
      }
    },
    archiveEmail(email) {
      email.archived = true;
      this.updateEmail(email);
    },
    unarchiveEmail(email) {
      email.archived = false;
      this.updateEmail(email);
    },
    updateEmail(email) {
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
    }
  }
};
</script>

<style scoped></style>

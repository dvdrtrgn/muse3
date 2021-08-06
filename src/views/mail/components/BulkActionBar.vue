<template>
  <div class="bulk-action-bar">
    <span class="checkbox">
      <input
        type="checkbox"
        :checked="allEmailsSelected"
        :class="[someEmailsSelected ? 'partial-check' : '']"
        @click="bulkSelect"
      />
    </span>
    <span class="buttons">
      <button
        :disabled="[...emailSelection.emails].every(e => e.read)"
        @click="emailSelection.markRead()"
      >
        Mark Read
      </button>
      <button
        :disabled="[...emailSelection.emails].every(e => !e.read)"
        @click="emailSelection.markUnread()"
      >
        Mark Unread
      </button>
      <button :disabled="!numberSelected" @click="emailSelection.archive()">Archive</button>
    </span>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import useEmailSelection from "../composables/useEmailSelection";

export default {
  props: {
    emails: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    let numTotal = computed(() => props.emails.length);
    let emailSelection = useEmailSelection();
    let numberSelected = computed(() => emailSelection.emails.size);
    let allEmailsSelected = computed(() => {
      return numberSelected.value && numTotal.value === numberSelected.value;
    });
    let someEmailsSelected = computed(() => {
      return numberSelected.value > 0 && numberSelected.value < numTotal.value;
    });

    let bulkSelect = () => {
      if (allEmailsSelected.value) {
        emailSelection.clear();
      } else {
        emailSelection.addMultiple(props.emails);
      }
    };

    return {
      emailSelection,
      allEmailsSelected,
      someEmailsSelected,
      numberSelected,
      numTotal,
      bulkSelect
    };
  },
  methods: {},
  computed: {}
};
</script>

<style></style>

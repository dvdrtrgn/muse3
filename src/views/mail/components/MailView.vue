<template>
  <div class="email-display">
    <div>
      <button @click="toggleArchive">
        {{ email.archived ? 'Move to inbox (e)' : 'Mark archived (e)' }}
      </button>
      <button @click="toggleRead">
        {{ email.read ? 'Mark unread (r)' : 'Mark read (r)' }}
      </button>
      <button @click="goNewer">Newer (k)</button>
      <button @click="goOlder">Older (j)</button>
    </div>
    <h2 class="mb-0">
      Subject: <strong>{{ email.subject }}</strong>
    </h2>
    <div>
      <em
        >From {{ email.from }} on
        {{ format(new Date(email.sentAt), 'MMM do yyy') }}</em
      >
    </div>
    <div v-html="marked(email.body)" />
  </div>
</template>

<script>
  import { format } from 'date-fns';
  import marked from 'marked';
  import useKeydown from '../composables/useKeydown';

  export default {
    props: ['email'],
    setup(props, { emit }) {
      let toggleRead = () =>
        emit('changeEmail', { toggleRead: true, save: true });
      let toggleArchive = () =>
        emit('changeEmail', {
          toggleArchive: true,
          save: true,
          closeModal: true,
        });
      let goOlder = () => emit('changeEmail', { changeIndex: 1 });
      let goNewer = () => emit('changeEmail', { changeIndex: -1 });
      let goOlderAndArchive = () =>
        emit('changeEmail', { changeIndex: 1, toggleArchive: true });
      let goNewerAndArchive = () =>
        emit('changeEmail', { changeIndex: -1, toggleArchive: true });

      useKeydown([
        { key: 'r', fn: toggleRead },
        { key: 'e', fn: toggleArchive },
        { key: 'k', fn: goNewer },
        { key: 'j', fn: goOlder },
        { key: '[', fn: goNewerAndArchive },
        { key: ']', fn: goOlderAndArchive },
      ]);

      return {
        format,
        marked,
        toggleRead,
        toggleArchive,
        goOlder,
        goNewer,
        goOlderAndArchive,
        goNewerAndArchive,
      };
    },
  };
</script>

<style scoped></style>

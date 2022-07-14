<script setup lang="ts">
import { $ref } from 'vue/macros'
import DialogBackdrop from '@components/DialogBackdrop.vue'

const companyStructure = [
  {
    id: 0,
    field: '总裁办'
  },
  {
    id: 0,
    field: '人事部'
  },
  {
    id: 0,
    field: '行政部'
  },
  {
    id: 0,
    field: '财务部'
  }
]

// dialog
let isShowDialog = $ref(false)
const showDialog = () => {
  isShowDialog = true
}

// eslint-disable-next-line prefer-const
let departmentName = $ref('')
// eslint-disable-next-line prefer-const
let departmentCode = $ref('')
// eslint-disable-next-line prefer-const
let departmentManager = $ref('')
const checkDepartmentName = () => {
  const regExp = /.{3~15}/
  if (!regExp.test(departmentName)) {
    window.alert('department name invalid')
  }
}
const checkDepartmentCode = () => {
  const regExp = /.{3~15}/
  if (!regExp.test(departmentCode)) {
    window.alert('department code invalid')
  }
}
</script>

<template>
  <main>
    <div class="card">
      <h3 class="company-name">
        传智教育
      </h3>

      <details
        v-for="item in companyStructure"
        :key="item.id"
        class="structure-item"
      >
        <summary>{{ item.field }}</summary>
        <div class="sub1">
          Requires a computer running an operating system. The computer
          must have some memory and ideally some kind of long-term storage.
          An input device as well as some form of output device is
          recommended.

          <button @click="showDialog">
            edit
          </button>
        </div>
      </details>
    </div>

    <DialogBackdrop
      v-model="isShowDialog"
      backdrop-theme="light"
      slot-transition-name="scale"
    >
      <div
        v-show="isShowDialog"
        class="edit-information"
      >
        <p>edit-information</p>

        <div class="row">
          <label for="department-name">department name</label>
          <input
            id="department-name"
            v-model="departmentName"
            type="text"
            @blur="checkDepartmentName"
          >
        </div>

        <div class="row">
          <label for="department-code">department code</label>
          <input
            id="department-code"
            v-model="departmentCode"
            type="text"
            @blur="checkDepartmentCode"
          >
        </div>

        <div class="row">
          <label for="department-manager">manager</label>
          <input
            id="department-manager"
            v-model="departmentManager"
            type="text"
            list="department-manager-list"
          >
          <datalist id="department-manager-list">
            <option value="aaaa" />
            <option value="bbbb" />
            <option value="cccc" />
            <option value="dddd" />
          </datalist>
        </div>
      </div>
    </DialogBackdrop>
  </main>
</template>

<style scoped lang="postcss">
main {
  flex: 1;
  overflow-y: auto;
}

.company-name {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: normal;
}

.card {
  padding: 16px;
  margin: 16px;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 rgb(0 0 0 / 24%);
}

.structure-item {
  & > summary {
    padding: 4px;
    border-radius: 2px;

    &:hover {
      background-color: hsl(240deg 23% 95%);
      cursor: pointer;
    }
  }

  & > .sub1 {
    margin-bottom: 1em;
    margin-left: 1em;
  }
}

.edit-information {
  position: fixed;
  top: calc(50% - 180px);
  left: calc(50% - 240px);
  display: block flex;
  width: 480px;
  height: 360px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: white;
  border-radius: 6px;
  box-shadow: var(--shadow-dialog);
  gap: 10px;

  & > p {
    margin-block: 1em;
    margin-inline: 1em;
  }

  & > .row {
    display: block flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 10px;

    & > label {
      display: block flex;
      width: 160px;
      align-items: center;
      justify-content: flex-end;
    }

    & > input[type="text"] {
      width: 200px;
    }
  }
}

.scale-enter-active {
  transition: transform 0.25s ease-out 0s, opacity 0.25s linear 0s;
}

.scale-leave-active {
  transition: transform 0.25s ease-in 0s, opacity 0.25s linear 0s;
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.75);
}

.scale-leave-to {
  opacity: 0;
  transform: scale(0.75);
}
</style>

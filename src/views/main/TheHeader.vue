<script setup lang="ts">
// vue
import { $ref } from 'vue/macros'
// components
import IconMenu from '~icons/ic/round-menu'
import IconPerson from '~icons/ic/baseline-person'
// for view switch
import { useStore } from '@stores/view'
import { ViewName, ViewTransitionType } from '@/AppViewSwitch'

interface ComponentProperties {
  userName: string
}
interface ComponentEmits {
  (e: 'switchAside'): void
}
const props = defineProps<ComponentProperties>()
const emit = defineEmits<ComponentEmits>()

// right dropdown
let isShowDropdown = $ref(false)
const switchDropdown = () => {
  isShowDropdown = !isShowDropdown
}

const store = useStore()
const logOut = () => {
  isShowDropdown = false
  history.pushState(ViewName.Login, 'login', '/login')
  store.appViewTransitionType = ViewTransitionType.SlideDown
  store.appActiveView = ViewName.Login
}
</script>

<template>
  <header>
    <div class="header-left">
      <IconMenu
        class="icon-block"
        @click="emit('switchAside')"
      />
    </div>

    <div class="header-center">
      Administrator Interface Dashboard
    </div>

    <div class="header-right">
      <div
        class="user"
        @mouseleave="isShowDropdown = false"
      >
        <div
          class="user-primary"
          @click="switchDropdown"
        >
          <IconPerson class="icon" />

          <span class="name">{{ props.userName }}</span>
        </div>

        <div
          v-show="isShowDropdown"
          class="user-dropdown"
        >
          <ul>
            <li>account</li>

            <li @click="logOut">
              log out
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="postcss">
header {
  display: block flex;
  height: 36px;
  background-color: var(--theme-color);
  box-shadow: 0 3px 6px 0 rgb(0 0 0 / 24%);
  color: white;
}

.icon-block {
  border-radius: 2px;
  font-size: 20px;
  transition: background-color 0.25s linear 0s;

  &:hover {
    background-color: hsl(var(--theme-hue) var(--theme-saturation) 58%);
    cursor: pointer;
  }

  &:active {
    background-color: hsl(var(--theme-hue) var(--theme-saturation) 70%);
  }
}

.header-left {
  display: block flex;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
  padding-left: 10px;
}

.header-center {
  display: block flex;
  overflow: hidden;
  flex: 1;
  align-items: center;
}

.header-right {
  display: block flex;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
  padding-left: 10px;

  & > .user {
    position: relative;
  }
}

.user-primary {
  display: block flex;
  min-width: 100px;
  align-items: center;
  justify-content: center;
  padding: 2px 4px;
  border-radius: 2px;
  transition: background-color 0.25s linear 0s;

  &:hover {
    background-color: hsl(var(--theme-hue) var(--theme-saturation) 58%);
    cursor: pointer;
  }

  &:active {
    background-color: hsl(var(--theme-hue) var(--theme-saturation) 70%);
  }

  & > .icon {
    font-size: 20px;
  }

  & > .name {
    overflow: hidden;
    max-width: 130px;
    margin-right: 4px;
    font-size: 16px;
    text-overflow: ellipsis;
    user-select: none;
    white-space: nowrap;
  }
}

.user-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding-top: 10px;

  & > ul {
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 0 6px 0 rgb(0 0 0 / 30%);
    color: black;
    list-style-type: none;
    margin-block: 0;
    margin-inline: 0;
    padding-inline: 0;

    & > li {
      display: block flex;
      height: 30px;
      align-items: center;
      justify-content: center;
      font-size: 15px;

      &:hover {
        background-color: hsl(240deg 23% 95%);
        cursor: pointer;
      }
    }
  }
}
</style>

<script setup lang="ts">
// vue
import { $ref, $computed } from 'vue/macros'
// component
import IconPerson from '~icons/ic/baseline-person'
import IconLock from '~icons/ic/baseline-lock'
import BodyOverlay from '@components/BodyOverlay.vue'
import LoadingSlot from '@components/OverlayLoadingSlot.vue'
import AccountInvalidSlot from './AccountInvalidSlot.vue'
import PasswordInvalidSlot from './PasswordInvalidSlot.vue'
import NetworkErrorSlot from './NetworkErrorSlot.vue'
// network
import { match } from 'ts-pattern'
import { postLogin } from '@network/requests/postLogin'
import type { Data } from '@network/requests/postLogin'
// import { login, Data } from '@network/logic/login'
// store
// import { openAppDB } from '@stores/openDB'
// for view switch
import { useStore } from '@stores/view'
import { ViewName, ViewTransitionType } from '@/AppViewSwitch'

// eslint-disable-next-line prefer-const
let account = $ref('')
let isAccountValid = $ref(true)
// eslint-disable-next-line prefer-const
let password = $ref('')
let isPasswordValid = $ref(true)

const validateAccount = () => {
  const regExp = /^\w{6,16}$/

  if (regExp.test(account)) {
    isAccountValid = true
  } else {
    isAccountValid = false
  }
}

const validatePassword = () => {
  const regExp = /^\w{6,16}$/

  if (regExp.test(password)) {
    isPasswordValid = true
  } else {
    isPasswordValid = false
  }
}

/* account input */
let isAccountFocused = $ref(false)
const handleAccountFocus = () => {
  isAccountFocused = true
}
const handleAccountBlur = () => {
  isAccountFocused = false
  validateAccount()
}

/* password input */
let isPasswordFocused = $ref(false)
const handlePasswordFocus = () => {
  isPasswordFocused = true
}
const handlePasswordBlur = () => {
  isPasswordFocused = false
  validatePassword()
}

// handle overlay slot dynamic component switch
let isShowOverlay = $ref(false)
const enum OverlaySlotComponent {
  Loading,
  AccountInvalid,
  PasswordInvalid,
  NetworkError,
}
let currentOverlaySlot = $ref(OverlaySlotComponent.Loading)
const overlaySlotComponent = $computed(() => {
  switch (currentOverlaySlot) {
    case OverlaySlotComponent.Loading:
      return LoadingSlot
    case OverlaySlotComponent.AccountInvalid:
      return AccountInvalidSlot
    case OverlaySlotComponent.PasswordInvalid:
      return PasswordInvalidSlot
    case OverlaySlotComponent.NetworkError:
      return NetworkErrorSlot
    default:
      throw new Error('unknown ovelay slot')
  }
})

// handle login button click
const handleLoginClick = async () => {
  validateAccount()
  if (!isAccountValid) {
    isShowOverlay = true
    currentOverlaySlot = OverlaySlotComponent.AccountInvalid
    return
  }

  validatePassword()
  if (!isPasswordValid) {
    isShowOverlay = true
    currentOverlaySlot = OverlaySlotComponent.PasswordInvalid
    return
  }

  isShowOverlay = true
  currentOverlaySlot = OverlaySlotComponent.Loading

  try {
    match(await postLogin(account, password))
      .with({ responseType: 'success' }, async result => {
        const data: Data = await result.responseContent.json()
        console.log(data)

        isShowOverlay = false
      })
      .otherwise(result => {
        console.log(result)
      })
  } catch (e) {
    if (e instanceof Error) {
      switch (e.message) {
        case 'Failed to fetch':
          currentOverlaySlot = OverlaySlotComponent.NetworkError
          break
        default:
          console.log(e)
      }
    } else {
      console.log(e)
    }
  }
}

// test
const store = useStore()
const go2TestView = () => {
  store.appViewTransitionType = ViewTransitionType.SlideRight
  store.appActiveView = ViewName.Test
}
</script>

<template>
  <div
    class="login-view"
    :data-view-name="ViewName.Login"
  >
    <main>
      <section class="login-left">
        <img
          src="../../assets/image/logo.png"
          alt="logo"
          class="logo"
        >

        <h2>
          Vue后台管理系统
        </h2>
      </section>

      <section class="login-right">
        <h3>登录</h3>

        <div
          class="row"
          :class="{
            'focus-valid': isAccountFocused && isAccountValid,
            'focus-invalid': isAccountFocused && !isAccountValid,
            'invalid': !isAccountValid
          }"
        >
          <IconPerson class="icon-block" />

          <input
            v-model.trim="account"
            maxlength="16"
            :class="{'invalid': !isAccountValid}"
            type="text"
            placeholder="请输入帐号"
            @focus="handleAccountFocus"
            @blur="handleAccountBlur"
          >
        </div>

        <div
          class="row"
          :class="{
            'focus-valid': isPasswordFocused && isPasswordValid,
            'focus-invalid': isPasswordFocused && !isPasswordValid,
            'invalid': !isPasswordValid
          }"
        >
          <IconLock class="icon-block" />

          <input
            v-model.trim="password"
            :class="{'invalid': !isPasswordValid}"
            type="password"
            placeholder="请输入密码"
            maxlength="16"
            @focus="handlePasswordFocus"
            @blur="handlePasswordBlur"
          >
        </div>

        <button
          class="login-button"
          @click="handleLoginClick"
        >
          登录
        </button>

        <p class="to-sign">
          还没有账号，<span tabindex="0">去注册</span>
        </p>
      </section>
    </main>

    <div>
      账号：13800000002
      <br>
      密码：123456
    </div>

    <button
      @click="go2TestView"
    >
      go to test
    </button>

    <BodyOverlay
      v-model="isShowOverlay"
      backdrop-theme="light"
      slot-transition-name="scale"
      :enable-close="false"
    >
      <component
        :is="overlaySlotComponent"
        @close="isShowOverlay = false"
      />
    </BodyOverlay>
  </div>
</template>

<style lang="postcss" scoped>
.login-view {
  position: absolute;
  display: block flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: var(--shadow-layer);
  gap: 16px;

  & > main {
    display: block flex;
    overflow: hidden;
    border-radius: 6px;
    box-shadow: var(--shadow-separate);
  }
}

.login-left {
  display: block flex;
  width: 300px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background-color: var(--theme-color);

  & > .logo {
    width: 60px;
    padding: 6px;
    background-color: white;
    border-radius: 6px;
    object-fit: fill;
  }

  & > h2 {
    color: white;
    font-size: 24px;
  }
}

.icon-block {
  margin-right: 15px;
  margin-left: 15px;
  font-size: 15px;
}

.login-right {
  display: block flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  gap: 22px;

  & > h3 {
    color: var(--theme-color);
    font-size: 20px;
  }

  & > .row {
    position: relative;
    display: block flex;
    width: 320px;
    height: 45px;
    box-sizing: border-box;
    align-items: center;
    padding-right: 15px;
    background-color: hsl(var(--theme-hue) 60% 95%);
    border-radius: 4px;
    color: hsl(0deg 0% 15%);

    &.focus-valid {
      outline: 2px solid var(--theme-color);
    }

    &.focus-invalid {
      outline: 2px solid hsl(354deg 70% 54%);
    }

    &.invalid {
      background-color: hsl(var(--error-hue) 60% 95%);
      color: hsl(354deg 70% 54%);
    }

    & > input {
      height: 100%;
      box-sizing: border-box;
      flex: 1;
      border: none;
      background-color: transparent;
      font-size: 15px;

      &::placeholder {
        color: #aaa;
      }

      &:focus {
        outline: none;
      }

      &.invalid {
        caret-color: hsl(354deg 70% 54%);
        color: hsl(354deg 70% 54%);
      }
    }
  }

  & > .to-sign {
    font-size: 15px;

    & > span {
      &:hover {
        color: var(--theme-color);
        cursor: pointer;
        text-decoration: underline;
      }

      &:focus {
        color: var(--theme-color);
        cursor: pointer;
        outline: none;
        text-decoration: underline;
      }
    }
  }
}

.login-button {
  width: 240px;
  height: 44px;
  border: none;
  appearance: none;
  background-color: var(--theme-color);
  border-radius: 22px;
  color: white;
  font-size: 16px;
  transition: background-color 0.25s linear 0s;

  &:focus {
    box-shadow: var(--shadow-separate);
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: hsl(var(--theme-hue) var(--theme-saturation) 72%);
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

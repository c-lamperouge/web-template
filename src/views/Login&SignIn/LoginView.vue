<script setup lang="ts">
import { $ref } from 'vue/macros'
import { computed } from 'vue'
import { openAppDB } from '@stores/openDB'
import { match } from 'ts-pattern'
import IconLock from '~icons/ic/baseline-lock'
import IconPhone from '~icons/ic/baseline-phone-iphone'
import BodyOverlay from '@components/BodyOverlay.vue'
import SlotLoading from '@components/OverlaySlotLoading.vue'
import ThePhoneNumberInvalidSlot from './ThePhoneNumberInvalidSlot.vue'
import TheVerificationCodeInvalid from './TheVerificationCodeInvalidSlot.vue'
import TheSendVerificationSuccessfullySlot from './TheSendVerificationSuccessfullySlot.vue'
import { getVerificationCode } from '@network/requests/getVerificationCode'
import { login, Data } from '@network/logic/login'

// eslint-disable-next-line prefer-const
let phoneNumber = $ref('')
let isPhoneNumberValid = $ref(true)
// eslint-disable-next-line prefer-const
let verificationCode = $ref('')
let isVerificationCodeValid = $ref(true)

const validatePhoneNumber = () => {
  const regExp = /^1[35789]\d{9}$/

  if (regExp.test(phoneNumber)) {
    isPhoneNumberValid = true
  } else {
    isPhoneNumberValid = false
  }
}

const validateVerificationCode = () => {
  const regExp = /^\d{6}$/

  if (regExp.test(verificationCode)) {
    isVerificationCodeValid = true
  } else {
    isVerificationCodeValid = false
  }
}

// handle overlay slot dynamic component switch
let isShowOverlay = $ref(false)
const enum OverlaySlotComponent {
  Loading,
  PhoneNumberInvalid,
  VerificationCodeInvalid,
  SendVerificationSuccessfully,
}
let currentOverlaySlot = $ref(OverlaySlotComponent.Loading)
const overlaySlotComponent = computed(() => {
  switch (currentOverlaySlot) {
    case OverlaySlotComponent.Loading:
      return SlotLoading
    case OverlaySlotComponent.PhoneNumberInvalid:
      return ThePhoneNumberInvalidSlot
    case OverlaySlotComponent.VerificationCodeInvalid:
      return TheVerificationCodeInvalid
    case OverlaySlotComponent.SendVerificationSuccessfully:
      return TheSendVerificationSuccessfullySlot
    default:
      return SlotLoading
  }
})

// handle send verification code button click
const handleSendVerificationClick = async () => {
  validatePhoneNumber()
  if (!isPhoneNumberValid) {
    isShowOverlay = true
    currentOverlaySlot = OverlaySlotComponent.PhoneNumberInvalid
    return
  }

  disableSendVerificationButtion()

  match(await getVerificationCode(phoneNumber))
    .with({ responseType: 'success' }, async () => {
      isShowOverlay = true
      currentOverlaySlot = OverlaySlotComponent.SendVerificationSuccessfully
    })
    .otherwise(() => {
      console.error('getVerificationCode failed')
    })
}

// getVerificationCode button countdown transform
let sendVerificationButtonContent = $ref('获取验证码')
let isDisableVerificationButton = $ref(false)

const disableSendVerificationButtion = () => {
  isDisableVerificationButton = true
  sendVerificationButtonContent = '剩余60秒'
  let count = 60

  const countdown = setInterval(() => {
    count -= 1
    if (count <= 0) {
      sendVerificationButtonContent = '获取验证码'
      isDisableVerificationButton = false
      clearInterval(countdown)
    } else {
      sendVerificationButtonContent = `剩余${count}秒`
    }
  }, 1000)
}

// handle login button click
const handleLoginClick = async () => {
  validatePhoneNumber()
  if (!isPhoneNumberValid) {
    isShowOverlay = true
    currentOverlaySlot = OverlaySlotComponent.PhoneNumberInvalid
    return
  }

  validateVerificationCode()
  if (!isVerificationCodeValid) {
    isShowOverlay = true
    currentOverlaySlot = OverlaySlotComponent.VerificationCodeInvalid
    return
  }

  isShowOverlay = true
  currentOverlaySlot = OverlaySlotComponent.Loading

  match(await login(phoneNumber, verificationCode))
    .with({ responseType: 'success' }, async result => {
      const data = await result.lastContent().json()
      await updateStoreUserInformation(data)

      isShowOverlay = false
    })
    .otherwise(result => {
      console.log(result.responseResultQueue)
    })
}

const updateStoreUserInformation = async (data: Data) => {
  const db = await openAppDB()
  const transaction = db.transaction('userInformation', 'readwrite')
  transaction.store.put(data.data.id, 'id')
  transaction.store.put(data.data.name, 'name')
  transaction.store.put(data.data.photo, 'avatarUrl')
  transaction.store.put(data.data.intro, 'introduction')
  transaction.store.put(Boolean(data.data.is_media), 'isWeMedia')
  transaction.store.put(data.data.ceti, 'certification')
  transaction.store.put(data.data.art_count, 'articleCount')
  transaction.store.put(data.data.fans_count, 'fansCount')
  transaction.store.put(data.data.follow_count, 'followerCount')
  transaction.store.put(data.data.like_count, 'likeCount')
  transaction.done.catch(e => {
    console.error(e)
  })
  db.close()
}

// according to state show send verification button
</script>

<template>
  <div class="login-view">
    <h2 class="login-heading">
      登录
    </h2>

    <main class="login-main">
      <div
        class="row"
        :class="{'invalid': !isPhoneNumberValid}"
      >
        <IconPhone class="icon-block" />

        <input
          v-model.number="phoneNumber"
          class="phone-number"
          :class="{'-invalid': !isPhoneNumberValid}"
          type="number"
          placeholder="请输入手机号"
          @blur="validatePhoneNumber"
        >
      </div>

      <div
        class="row"
        :class="{'invalid': !isVerificationCodeValid}"
      >
        <IconLock class="icon-block" />

        <input
          v-model.trim="verificationCode"
          class="verification-code"
          :class="{'-invalid': !isVerificationCodeValid}"
          type="password"
          placeholder="请输入验证码"
          maxlength="6"
          @blur="validateVerificationCode"
        >
      </div>

      <button
        class="send-verification"
        :disabled="isDisableVerificationButton"
        @click="handleSendVerificationClick"
      >
        {{ sendVerificationButtonContent }}
      </button>

      <button
        class="login-button"
        @click="handleLoginClick"
      >
        确定
      </button>

      <span class="privacy-policy">隐私条款</span>
    </main>

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
  display: block flex;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 30px;
  background-color: white;
  box-shadow: var(--shadow-layer);
}

.login-heading {
  display: block flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: var(--theme-color);
  font-size: 44px;
}

.icon-block {
  margin-right: 30px;
  margin-left: 30px;
  font-size: 30px;
}

.login-main {
  display: block flex;
  width: 100%;
  flex-direction: column;
  align-items: center;

  & > .row {
    position: relative;
    display: block flex;
    width: 100%;
    height: 90px;
    box-sizing: border-box;
    align-items: center;
    padding-right: 30px;
    background-color: hsl(var(--theme-hue) 60% 95%);
    border-radius: 8px;
    color: hsl(0deg 0% 15%);

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
      font-size: 30px;

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

  & > .row + .row {
    margin-top: 20px;
  }
}

.send-verification {
  width: 180px;
  height: 56px;
  border: none;
  margin-top: 20px;
  background-color: hsl(0deg 0% 90%);
  border-radius: 28px;
  color: #666;
  font-size: 26px;
  transition: background-color 0.25s linear 0s;

  &:focus {
    outline: none;
  }

  &:active {
    background-color: hsl(0deg 0% 95%);
  }

  &:disabled {
    background-color: hsl(0deg 0% 95%);
  }
}

.login-button {
  width: 694px;
  height: 88px;
  border: none;
  margin-top: 44px;
  margin-bottom: 44px;
  appearance: none;
  background-color: #6db4fb;
  border-radius: 44px;
  color: white;
  font-size: 32px;
  transition: background-color 0.25s linear 0s;

  &:focus {
    outline: none;
  }

  &:active {
    background-color: hsl(210deg 95% 59%);
  }
}

.privacy-policy {
  color: #666;
  font-size: 26px;
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

<template>
  <div class="prompt-wrapper">
    <img class="bottom-dots" src="../../assets/svgs/bottom-dots.svg" />
    <img class="top-dots" src="../../assets/svgs/top-dots.svg" />

    <div class="widget_wrapper">
      <main class="_widget login-id">
        <section class="c4b29eca4 _prompt-box-outer c05e9daa5">
          <div class="c6659f309 cccb93873">
            <div class="c31ae6f41">
              <header class="cf2c263ec c3b965638">
                <div
                  title="D-ID"
                  id="custom-prompt-logo"
                  style="
                    width: auto !important;
                    height: 60px !important;
                    position: static !important;
                    margin: auto !important;
                    padding: 0 !important;
                    background-color: transparent !important;
                    background-position: center !important;
                    background-size: contain !important;
                    background-repeat: no-repeat !important;
                  "
                ></div>

                <img
                  class="cbefd69e1 c9ea68b50"
                  id="prompt-logo-center"
                  src="../../assets/Logo_new.png"
                  alt="D-ID"
                />

                <h1 class="cc854c13c c8b064d01">Log in to Try-On</h1>

                <div class="c3796a4db c0ba659d6">
                  <p class="c83b79980 c2fd98237">
                    Transform your photos into talking digital people
                  </p>
                </div>
              </header>

              <div class="ce16dfdb7 cfc0cd1f7">
                <div class="c925c2b03 cbb3754db">
                  <div class="c7f2d18c1">
                    <div class="c925c2b03 cbb3754db">
                      <div class="c7f2d18c1">
                        <div class="input-wrapper _input-wrapper">
                          <div
                            class="ccd761bda c9104f547 text ca9add931 c510d718d"
                            data-action-text=""
                            data-alternate-action-text=""
                          >
                            <input
                              class="input c0347a5e6 cce001ae5"
                              inputmode="email"
                              type="text"
                              v-model="authForm.email"
                              placeholder="Email address"
                              autocomplete="username"
                              autocapitalize="none"
                              spellcheck="false"
                              autofocus
                              @blur="emailBlur"
                            />
                            <span
                              v-show="emailError"
                              style="color: red; margin-top: 6px"
                              >请输入邮箱</span
                            >

                            <input
                              class="input c0347a5e6 cce001ae5"
                              style="margin-top: 10px"
                              v-show="type === 'register' || showPassword"
                              type="password"
                              placeholder="password"
                              v-model="authForm.password"
                              show-password
                              @keyup.enter="authFn(type)"
                              @blur="passwordBlur"
                            />
                            <span
                              v-show="showPassword && passwordError"
                              style="color: red; margin-top: 6px"
                              >请输入密码</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="cb2df1009">
                      <button
                        type="button"
                        @click="authFn(type)"
                        value="default"
                        class="c27976896 c59c30c43 cced51fe7 c5e1937d6 _button-login-id"
                      >
                        {{ type === "register" ? "注 册" : "登 录" }}
                      </button>
                    </div>
                  </div>
                </div>

                <div class="ulp-alternate-action _alternate-action __s16nu9">
                  <p class="c83b79980 c2fd98237 c88602867">
                    {{
                      type === "register"
                        ? "Already have an account"
                        : "Don't have an account?"
                    }}
                    <span
                      v-if="type === 'login'"
                      class="cb181a341 ca8ce6dc8"
                      style="cursor: pointer"
                      @click="type = 'register'"
                      >Sign up</span
                    >

                    <span
                      v-else
                      class="cb181a341 ca8ce6dc8"
                      style="cursor: pointer"
                      @click="type = 'login'"
                      >Login</span
                    >
                  </p>
                </div>

                <div
                  class="c98fcc0f0 cb3a0b9a1"
                  v-if="type === 'login' && !showPassword"
                >
                  <span>Or</span>
                </div>

                <div
                  class="c09ffc6ab ca83ba8b4"
                  v-if="type === 'login' && !showPassword"
                >
                  <button
                    type="button"
                    @click="googleSignIn"
                    class="c2fe838c4 cad45f715 c0072acd4"
                    data-provider="google"
                  >
                    <span
                      class="c31f2b669 c51a1d205"
                      data-provider="google"
                    ></span>

                    <span class="cdd10c360">Continue with Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
    <footer class="footer">
      <p>
        By signing in, I confirm that I have read and accepted D-ID’s
        <a href="" target="_blank">Terms &amp; Conditions</a>
        and
        <a href="" target="_blank">Privacy Policy.</a>
      </p>
    </footer>
  </div>
</template>

<script>
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import profiles from "@/api/profiles";

export default {
  data() {
    return {
      type: "login",
      showPassword: false,
      authForm: {
        email: "",
        password: "",
      },
      emailError: false,
      passwordError: false,
    };
  },
  watch: {
    "authForm.email": {
      handler(val) {
        this.type = "login",
        this.showPassword = !!val;
      },
    },
  },
  mounted() {
    GoogleAuth.initialize({
      clientId:
        "647725136259-3djfro50mv7gdbreml8a8vm1uv4s4kur.apps.googleusercontent.com",
      scopes: ["profile", "email"],
      grantOfflineAccess: true,
    });
  },
  methods: {
    async googleSignIn() {
      const googleUser = await GoogleAuth.signIn();
      if (googleUser) {
        this.googleLoginFn(googleUser);
      } else {
        this.$message.error("登录失败");
      }
    },
    logincallbackFn(data) {
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          email: this.authForm.email,
          ...data,
        })
      );
      this.$router.push("/model");
    },
    googleLoginFn({ email }) {
      profiles
        .loginGoogle({ email })
        .then((data) => {
          this.$message.success("登录成功");
          this.logincallbackFn(data);
        })
        .catch(() => {
          this.$message.error("登录失败");
        });
    },
    emailBlur(e) {
      const value = e.target.value;
      this.emailError = !value;
    },
    passwordBlur(e) {
      const value = e.target.value;
      this.passwordError = !value;
    },
    authFn(type) {
      console.log(type);
      this.type = type;
      if (!this.authForm.email) {
        this.emailError = true;
        return;
      }

      if (!this.authForm.password) {
        this.passwordError = true;
        return;
      }
      const request = profiles[this.type];
      let label = "登录";
      let callback = this.logincallbackFn;
      if (this.type === "register") {
        label = "注册";
        callback = () => {
          this.$refs.authForm.resetFields();
          this.type = "login";
        };
      }
      request(this.authForm)
        .then(({ data }) => {
          this.$message.success(`${label}成功`);
          callback(data);
        })
        .catch(() => {
          this.$message.error(`${label}失败`);
        });
    },
  },
};
</script>

<style scoped lang="less">
//  :root {
//         --primary-color: #090604;
//       }

//       :root {
//         --button-font-color: #ffffff;
//       }

//       :root {
//         --secondary-button-border-color: #c9cace;
//         --social-button-border-color: #c9cace;
//         --radio-button-border-color: #c9cace;
//       }

//       :root {
//         --secondary-button-text-color: #242625;
//       }

//       :root {
//         --link-color: #090604;
//       }

//       :root {
//         --title-font-color: #1e212a;
//       }

//       :root {
//         --font-default-color: #1e212a;
//       }

//       :root {
//         --widget-background-color: #ffffff;
//       }

//       :root {
//         --box-border-color: #c9cace;
//       }

//       :root {
//         --font-light-color: #65676e;
//       }

//       :root {
//         --input-text-color: #000000;
//       }

//       :root {
//         --input-border-color: #c9cace;
//         --border-default-color: #c9cace;
//       }

//       :root {
//         --input-background-color: #ffffff;
//       }

//       :root {
//         --icon-default-color: #65676e;
//       }

//       :root {
//         --error-color: #f53e3e;
//         --error-text-color: #ffffff;
//       }

//       :root {
//         --success-color: #5fad56;
//       }

//       :root {
//         --base-focus-color: #2b2a28;
//         --transparency-focus-color: rgba(43, 42, 40, 0.15);
//       }

//       :root {
//         --base-hover-color: #ffffff;
//         --transparency-hover-color: rgba(
//           255,
//           255,
//           255,
//           var(--hover-transparency-value)
//         );
//       }

body {
  --font-family: "ULP Custom", -apple-system, BlinkMacSystemFont, Roboto,
    Helvetica, sans-serif;
}

html,
:root {
  font-size: 16px;
  --default-font-size: 16px;
}

body {
  --title-font-size: 1.5rem;
  --title-font-weight: var(--font-default-weight);
}

.c3796a4db {
  font-size: 0.875rem;
  font-weight: var(--font-default-weight);
}

.ce16dfdb7 {
  font-size: 0.875rem;
  font-weight: var(--font-default-weight);
}

.ulp-passkey-benefit-heading {
  font-size: 1.025rem;
}

.c27976896,
.cae724a40 {
  font-size: 1rem;
  font-weight: var(--font-default-weight);
}

body {
  --ulp-label-font-size: 1rem;
  --ulp-label-font-weight: var(--font-default-weight);
}

.c37a14c7b,
.cb181a341,
[id^="ulp-container-"] a {
  font-size: 0.875rem;
  font-weight: var(--font-bold-weight) !important;
}

:root {
  --button-border-width: 1px;
  --social-button-border-width: 1px;
  --radio-border-width: 1px;
}

body {
  --button-border-radius: 8px;
  --radio-border-radius: 8px;
}

:root {
  --input-border-width: 1px;
}

body {
  --input-border-radius: 6px;
}

:root {
  --border-radius-outer: 5px;
}

:root {
  --box-border-width: 0px;
}

body {
  --logo-alignment: 0 auto;
}

// .cbefd69e1 {
//   content: url("https://d-id-sso-assets.d-id.com/Logo_new.png");
// }

body {
  --logo-height: 52px;
}

.cbefd69e1 {
  height: var(--logo-height);
}

body {
  --header-alignment: center;
}

.cfc0cd1f7 {
  display: flex;
  flex-direction: column;
}

.cfc0cd1f7 form,
.cfc0cd1f7 > .cbb3754db {
  order: 3;
}

.cfc0cd1f7 ._alternate-action,
.cfc0cd1f7 #ulp-container-form-footer-start,
.cfc0cd1f7 #ulp-container-form-footer-end {
  order: 4;
}

.cfc0cd1f7 > .cb3a0b9a1 {
  order: 2;
  margin-bottom: 24px;
}

.cfc0cd1f7 .ca83ba8b4 {
  order: 1;
  margin-top: 0;
}

.c136c0e45 {
  --page-background-alignment: center;
}

body {
  --page-background-color: #ffffff;
}

.prompt-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  background: #fff;
}

.widget_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.top-dots {
  position: fixed;
  top: 0;
  right: 0;
}

.bottom-dots {
  position: fixed;
  bottom: 0;
  left: 0;
}

@media (max-width: 1100px) {
  .top-dots,
  .bottom-dots {
    display: none;
  }
}

.footer {
  flex-grow: 0;
  flex-shrink: 0;
  background: transparent;
  font: inherit;
  font-size: inherit;
  position: relative;
  padding: 16px 0;
  max-width: 400px;
  color: #1e212a;
  font: inherit;
  font-size: 14px;
  line-height: 140%;
}

.footer p {
  text-align: center;
  margin: 0 4px;
}

.footer a {
  color: #5c79fc;
  font-size: 14px;
  white-space: nowrap;
}
</style>

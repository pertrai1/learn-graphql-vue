// @ts-ignore
import App from "./App.vue"
import { createApp, provide, h } from "vue"
import { router } from "./router"

import { DefaultApolloClient } from "@vue/apollo-composable"
import { apolloClient } from "./apollo-client"

import authPlugin from "./auth/authPlugin"

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.use(authPlugin)
app.use(router)
app.mount("#app")

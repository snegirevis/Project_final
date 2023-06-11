export default function ({ store, redirect }) {
    if (!store.getters.GET_LOGGEDIN) {
      return redirect('/login')
    }
  }
  
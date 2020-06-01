export default function theme (state = "tomato", action) {
  if (action.type === 'CHANGE_THEME') {
    return action.payload
  } else {
    return state
  }
}

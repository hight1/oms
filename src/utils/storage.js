// Operation LocalStorage
export function setLocalStorage (key, vaule) {
  return localStorage.setItem(key, vaule)
}

export function getLocalStorage (key) {
  const value = localStorage.getItem(key)
  return value
}

export function setLocalStorageJson (key, vaule) {
  return localStorage.setItem(key, JSON.stringify(vaule))
}

export function getLocalStorageJson (key) {
  const value = JSON.parse(localStorage.getItem(key))
  return value
}

// Operation SessionStorage
export function setSessionStorage (key, vaule) {
  return sessionStorage.setItem(key, vaule)
}

export function getSessionStorage (key) {
  const value = sessionStorage.getItem(key)
  return value
}

export function setSessionStorageStorageJson (key, vaule) {
  return sessionStorage.setItem(key, JSON.stringify(vaule))
}

export function getSessionStorageStorageJson (key) {
  const value = JSON.parse(sessionStorage.getItem(key))
  return value
}

export function clearSessionStorage (key) {
  sessionStorage.removeItem(key)
}

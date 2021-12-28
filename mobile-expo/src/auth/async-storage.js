import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getItem(key) {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export async function setItem(key, value) {
  return AsyncStorage.setItem(key, JSON.stringify(value));
}
export async function removeItem(key) {
  return AsyncStorage.removeItem(key);
}

const USER = 'user';
export const getUser = () => getItem(USER);
export const removeUser = () => removeItem(USER);
export const setUser = value => setItem(USER, value);

export async function getToken() {
  const user = await getUser();
  return user?.jwtToken;
}

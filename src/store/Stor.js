import {SecureStore} from 'expo';

const Stor = async (key, value) => {

  let json = ''

  if ('object' == typeof value) {
    await SecureStore.setItemAsync(key, JSON.stringify(value))
  }
  else {
    json = await SecureStore.getItemAsync(key)
    return json
  }

}

export default Stor
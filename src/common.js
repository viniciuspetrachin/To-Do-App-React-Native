import { Alert, Platform } from 'react-native'

function showError(err){
   Alert.alert('Ops! Ocorreu um erro!', `Mensagem: ${err}`)
}
function showSuccess(msg){
   Alert.alert('Sucesso!', msg)
}

export { showError, showSuccess }
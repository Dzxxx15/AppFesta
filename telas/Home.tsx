import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import {useNavigation} from '@react-navigation/native';

export default function Home() {

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciador de Festa</Text>

      <View style={styles.bloco}>

          <TouchableOpacity style={styles.btn}
            onPress={()=>navigation.navigate('ListarClientes' as never)}
          >
              <Text style={styles.txtBtn}>Clientes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn}>
              <Text style={styles.txtBtn}>Usuários</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo:{
    fontSize:35,
    fontWeight:'bold'
  },
  btn:{
    backgroundColor:'#669988',
    marginLeft:'10%',
    marginRight:'10%',
    marginTop:20,
    padding:20,
    borderRadius:20
  },
  txtBtn:{
    textAlign:'center',
    fontSize:20
  },
  bloco:{
    width:'100%'
  }
});
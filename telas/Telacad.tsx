import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import {useNavigation,} from '@react-navigation/native';

import api from '../componentes/Api';

export default function TelaCad() {

 const navigation = useNavigation();

 const [nome, setNome] = useState('');
 const [cpf, setCpf] = useState('');
 const [saldo, setSaldo] = useState('');
 return (
    <>
        <View style={styles.container}>
              <Text>Cadastro de Cliente</Text>
        
              <View style={styles.bloco}>
                
                <TextInput 
                    placeholder='Digite seu nome ...'
                    value={nome}
                    onChangeText={(value)=>setNome(value)}
                />

                <TextInput 
                    placeholder='Digite seu CPF ...'
                    value={cpf}
                    onChangeText={(value)=>setCpf(value)}
                />


                <TextInput 
                    placeholder='Digite o saldo ...'
                    value={saldo}
                    onChangeText={(value)=>setSaldo(value)}
                />

                <TouchableOpacity  style={styles.btn}>
                  <Text style={styles.txtBtn} onPress={async ()=> {
                    try{
                        const resp = await api.post('clientes',{
                                    nome: nome,
                                    cpf:cpf,
                                    saldo:saldo
                                });

                                alert(JSON.stringify(resp.data.message));
                                navigation.navigate('ListarClientes' as never);
                        }catch{
                                alert("Deu erro!");
                        }        
                    }
                        
                    }
                  >Cadastrar</Text>
                </TouchableOpacity>
        
                
        
              </View>
            </View>

   </>
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
    fontSize:30,
    fontWeight:'bold'
  },
  bloco:{
    marginLeft:'10%',
    marginRight:'10%',
    width:'80%',    
  },
  btn:{
    backgroundColor:"#6691d6ff",
    width:'100%',
    marginTop:20,
    borderRadius:20,
  },
  txtBtn:{
    textAlign:'center',
    fontSize:25
  }
});
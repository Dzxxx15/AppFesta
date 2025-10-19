import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';

import api from '../componentes/Api';

export default function TelaEditar() {

type ClienteType = {id:number, nome: string, cpf: string, saldo: number};

const route = useRoute();

const {cliente} = route.params as {cliente: ClienteType};

 const navigation = useNavigation();

 const [id, setId] = useState(String(cliente?.id ?? ''));
 const [nome, setNome] = useState(String(cliente?.nome ?? ''));
 const [cpf, setCpf] = useState(String(cliente?.cpf ?? ''));
 const [saldo, setSaldo] = useState(String(cliente?.saldo ?? ''));
 return (
    <>
        <View style={styles.container}>
              <Text>Editar Cadastro do Cliente</Text>
        
              <View style={styles.bloco}>
                <TextInput 
                    placeholder='ID ...'
                    value={id}
                    onChangeText={(value)=>setId(value)}
                    editable={false}
                />
                
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
                        const resp = await api.put('clientes',{
                                    id:id,
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
                  >Salvar Alterações</Text>
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
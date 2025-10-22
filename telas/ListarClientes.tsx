import { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Cliente from '../componentes/Cliente';
import api from '../componentes/Api';

// --- Tipo do cliente
type ClienteType = { id: number; nome: string; cpf: string; saldo: number };

// --- Tipo das rotas
type RootStackParamList = {
  Home: undefined;
  ListarClientes: undefined;
  TelaCad: undefined;
  TelaEditar: { cliente: ClienteType };
};

// --- Tipo da navegação
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ListarClientes'>;

export default function ListarClientes() {
  const navigation = useNavigation<NavigationProp>();

  const [clientes, setCliente] = useState<ClienteType[]>([]);

  async function buscaClientes() {
    const response = await api.get('clientes');
    setCliente(response.data);
  }

  useEffect(() => {
    buscaClientes();
  }, []);

  async function excluir(id: number) {
    try {
      const r = await api.delete(`clientes/${id}`);
      Alert.alert("Excluir", `${JSON.stringify(r.data)}`);
      await buscaClientes();
    } catch (e: any) {
      Alert.alert("Erro ao excluir", e?.message ?? "Erro desconhecido");
    }
  }

  function editar(item: ClienteType) {
    navigation.navigate('TelaEditar', { cliente: item });
  }

  return (
    <>
      <View style={styles.bloco}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('TelaCad')}>
          <Text style={styles.txtBtn}>Cadastrar Novo Cliente</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.titulo}>Lista de Clientes</Text>

        <FlatList
          data={clientes}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Cliente
              nome={item.nome}
              cpf={item.cpf}
              saldo={item.saldo}
              id={item.id}
              onExcluir={() => excluir(item.id)}
              onEditar={() => editar(item)}
            />
          )}
          style={styles.lista}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,                                                                           
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  btn: {
    backgroundColor: '#669988',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
  },
  txtBtn: {
    textAlign: 'center',
    fontSize: 20,
  },
  bloco: {
    width: '100%',
  },
  lista: {
    width: '80%',
    height: '70%',
    alignSelf: 'center',
  },
});

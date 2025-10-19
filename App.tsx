// In App.js in a new project

import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './telas/Home';
import ListarClientes from './telas/ListarClientes';
import TelaCad from './telas/Telacad';
import TelaEditar from './telas/TelaEditar';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: Home,
    ListarClientes:ListarClientes,
    TelaCad:TelaCad,
    TelaEditar:TelaEditar
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
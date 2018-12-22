import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './src/Home';
import Cadastro from './src/Cadastro';
import Login from './src/Login';
import Interna from './src/Interna';
import Preload from './src/Preload';
import AddReceita from './src/AddReceita';
import AddDespesa from './src/AddDespesa';

const Navegador = createStackNavigator({
  Preload:{
    screen:Preload
  },
  Home:{
    screen:Home
  },
  Cadastro:{
    screen:Cadastro
  },
  Login:{
    screen:Login
  },
  Interna:{
    screen:Interna
  },
  AddReceita:{
    screen:AddReceita
  },
  AddDespesa:{
    screen:AddDespesa
  }
});

const App = createAppContainer(Navegador);

export default App;


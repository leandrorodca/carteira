import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import firebase from './FirebaseConnection';

export default class Home extends Component{

	static navigationOptions = {
		title:null,
		header:null
	}

	constructor(props) {
	  super(props);
	
	  this.state = {};

	  //ouvinte
	  firebase.auth().onAuthStateChanged((user)=>{
	  	if (user) {
	  		this.props.navigation.navigate('Interna');
	  	}else{
	  		this.props.navigation.navigate('Home');
	  	}
	  });
	 
	}

	

	render(){

		return(
			<ImageBackground source={require('../assets/images/fundo.jpg')} style={style.bg}>
				<View style={style.container}>
					<Text style={style.title}>Carteira</Text>
					<Text style={style.subtitle}>V-1.1</Text>
				
				</View>

			</ImageBackground>
			);
	}
}

const style = StyleSheet.create({
	bg:{
		flex:1,
		width:null
	},
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	title:{
		fontSize:30,
		backgroundColor:'transparent'
	},
	subtitle:{
		fontSize:20,
		backgroundColor:'transparent'
	},
	
});
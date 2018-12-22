import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableHighlight} from 'react-native';

export default class Home extends Component{

	static navigationOptions = {
		title:null,
		header:null
	}

	constructor(props) {
	  super(props);
	
	  this.state = {};

	  this.cadastrar = this.cadastrar.bind(this);
	  this.login = this.login.bind(this);
	}

	cadastrar(){
		this.props.navigation.navigate('Cadastro');
	}

	login(){

		this.props.navigation.navigate('Login');
		
	}

	render(){

		return(
			<ImageBackground source={require('../assets/images/fundo.jpg')} style={style.bg}>
				<View style={style.container}>
					<Text style={style.title}>Carteira v1.1</Text>
					<View style={style.buttonArea}>
						<TouchableHighlight underlayColor="#CCCCCC" style={style.button} onPress={this.cadastrar}>
							<Text style={style.btnText}>Cadastrar</Text>
						</TouchableHighlight>
						<TouchableHighlight underlayColor="#CCCCCC" style={style.button} onPress={this.login}>
							<Text style={style.btnText}>Entrar</Text>
						</TouchableHighlight>
					</View>

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
	buttonArea:{
		marginTop:30
	},
	button:{
		backgroundColor:'#bfb300',
		margin:10,
		height:60,
		width:300,
		justifyContent:'center',
		borderRadius:20

	},
	btnText:{
		color:'#FFFFFF',
		textAlign:'center',
		fontSize:25
	}
});


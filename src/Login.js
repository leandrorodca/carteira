import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput,TouchableHighlight} from 'react-native';
import firebase from './FirebaseConnection';



export default class Login extends Component{

	static navigationOptions = {
		title:"Login",
		headerStyle:{
			backgroundColor:'#FFFF00',

		},
		headerTintColor:'#000000'
	}
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	emailInput:'',
	  	senhaInput:''
	  };
	  this.logar = this.logar.bind(this);
	  

	  firebase.auth().signOut();
	
	}

	
	//efetua o cadastro do usuário mediante email e senha
	logar(){
		if (this.state.emailInput != '' && this.state.senhaInput != '') {

				
					//olheiro
					firebase.auth().onAuthStateChanged((user)=>{

						if (user) {

							
							this.props.navigation.navigate('Interna');
						}
					});
				//verificação dos dados	
				firebase.auth().signInWithEmailAndPassword(
					this.state.emailInput,
					this.state.senhaInput
					).catch((error)=>{
					alert(error.code);
				});

			}else{
				alert('Preencha todos os campos!');
			}
	
	} 
	
	render(){

		return(
			
			<View style={styles.container}>
				
				<Text style={styles.label}> E-mail: </Text>
				<TextInput 
					style={styles.input} 
					onChangeText={(emailInput)=>this.setState({emailInput})} 
					placeholder='Digite seu email...@...'/>
				<Text style={styles.label}> Senha: </Text>
				<TextInput secureTextEntry={true} style={styles.input} onChangeText={(senhaInput)=>this.setState({senhaInput})} placeholder='Digite sua senha...'/>
				<View style={styles.buttonArea}>
					<TouchableHighlight underlayColor="#CCCCCC" style={styles.button} onPress={this.logar}>
						<Text style={styles.btnText}>Entrar</Text>
					</TouchableHighlight>
					
				</View>
			</View>
			
			);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		width: null,
		justifyContent:'center',
		paddingLeft:15,
		paddingRight: 15,
		backgroundColor:'#FFFFCC'
			
	},
	label:{
		padding:10
	},
	input:{
		height:50,
		backgroundColor:'#CCCCCC',
		padding:10,
		marginBottom:10,
		borderRadius:20,
		fontSize: 20
	},
	buttonArea:{
		marginTop:30,
		alignItems:'center'

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
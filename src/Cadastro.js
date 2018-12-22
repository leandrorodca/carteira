import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput,TouchableHighlight} from 'react-native';
import firebase from './FirebaseConnection';



export default class Cadastro extends Component{

	static navigationOptions = {
		title:"Cadastro",
		headerStyle:{
			backgroundColor:'#FFFF00',

		},
		headerTintColor:'#000000'
	}
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	emailInput:'',
	  	senhaInput:'',
	  	nomeInput:''
	  };
	  this.cadastrar = this.cadastrar.bind(this);
	  this.validarEmail = this.validarEmail.bind(this);

	  firebase.auth().signOut();
	
	}

	//valida o email digitado antes de submeter
	validarEmail(email){
		
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
		
		if(reg.test(email) === false)
		{

			return false;
  		}
	
		return true;	
	
	}
	//efetua o cadastro do usuário mediante email e senha
	cadastrar(){

			

			if (this.state.nomeInput != '' && this.state.emailInput != '' && this.state.senhaInput != '') {

				if (this.validarEmail(this.state.emailInput)) {
					
					firebase.auth().onAuthStateChanged((user)=>{

						if (user) {

							let uid = user.uid;

							firebase.database().ref('users').child(uid).set({
								saldo:0,
								nome:this.state.nomeInput
							});

							this.props.navigation.navigate('Interna');
						}
					});

				firebase.auth().createUserWithEmailAndPassword(
					this.state.emailInput,
					this.state.senhaInput
					).catch((error)=>{
					alert(error.code);
				});

					
				}else{
				
					alert('Email inválido');
				}
			}else{
				alert('Preencha todos os campos!');
			}
	} 
	
	render(){

		return(
			
			<View style={styles.container}>
				
				<Text style={styles.label}> Nome: </Text>
				<TextInput style={styles.input} onChangeText={(nomeInput)=>this.setState({nomeInput})} />
				<Text style={styles.label}> E-mail: </Text>
				<TextInput style={styles.input} onChangeText={(emailInput)=>this.setState({emailInput})} />
				<Text style={styles.label}> Senha: </Text>
				<TextInput secureTextEntry={true} style={styles.input} onChangeText={(senhaInput)=>this.setState({senhaInput})}/>
				<View style={styles.buttonArea}>
					<TouchableHighlight underlayColor="#CCCCCC" style={styles.button} onPress={this.cadastrar}>
						<Text style={styles.btnText}>Enviar</Text>
					</TouchableHighlight>
					
				</View>
			</View>
			
			);
	}
}

const styles = StyleSheet.create({
	
	container:{
		paddingLeft:15,
		paddingRight: 15,
		flex:1,
		width:null,
		backgroundColor:'#FFFFCC',		
		justifyContent:'center',
		
		
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
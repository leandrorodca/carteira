import React, {Component} from 'react';
import {View, Text, StyleSheet,TextInput ,Button} from 'react-native';
import firebase from './FirebaseConnection';

export default class AddReceita extends Component{

	static navigationOptions = {
		title:'Adicionar Receita',
		
		
	}

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	valor:''
	  };

	  this.add = this.add.bind(this);
	 
	}



	add(){
		let data = new Date(); 
		let dataFormatada = data.toLocaleDateString();
		if (this.state.valor !='') {

			//ou pode ser feito assim
			// let historico = firebase.database().ref('historico').child(firebase.auth().currentUser.uid);
			// let key = historico.push().key;

			let uid = firebase.auth().currentUser.uid;

			let key = firebase.database().ref('historico').child(uid).push().key;

			let user = firebase.database().ref('users').child(uid);

			//adicionando no hitórico
			firebase.database().ref('historico').child(uid).child(key).set({

				type:'receita',
				valor:parseFloat(this.state.valor).toFixed(2),
				today:dataFormatada
			});

			user.once('value').then((snapshot)=>{

						let saldo = parseFloat(snapshot.val().saldo);

						saldo += parseFloat(this.state.valor);

						saldo = saldo.toFixed(2);

						user.set({
							saldo:saldo
						});

						this.props.navigation.goBack();
					});
		}
	}


	render(){

		return(
			<View style={styles.bg}>
				<View style={styles.container}>
					<Text> Quanto adicinar? {this.state.data}</Text>
					<TextInput

						style={styles.input}
						keyboardType='decimal-pad'
						value={this.state.valor}
						maxLength = {8}
						autoFocus={true}
						onChangeText={(valor)=>this.setState({valor})}
					/>
					<Button 
						title="Adicionar" 	
						onPress={this.add} 
						color='blue'
						

						/>
				</View>
			</View>
			);
	}
}

const styles = StyleSheet.create({
	bg:{
		flex:1,
		width:null,
		backgroundColor:'#FFFFCC'
	},
	container:{
		margin:10,
		
	},
	input:{
		height:50,
		backgroundColor:'#CCCCCC',
		padding:10,
		marginBottom:10,
		borderRadius:20
	}
	
});
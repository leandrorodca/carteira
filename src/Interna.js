import React, {Component} from 'react';
import {View, Text, StyleSheet,FlatList ,Button} from 'react-native';
import firebase from './FirebaseConnection';
import HistoricoItem from './HistoricoItem';

export default class Interna extends Component{

	static navigationOptions = {
		title:'Home',
		
		header:null
	}

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	saldo:0,
	  	nome:'',
	  	historico:[]
	  };

	  this.addReceita = this.addReceita.bind(this);
	  this.addDespesa = this.addDespesa.bind(this);
	  this.sair = this.sair.bind(this);

	  //ouvinte
	  firebase.auth().onAuthStateChanged((user)=>{
	  	if (user) {

	  		// olheiro do saldo
	  		firebase.database().ref('users').child(user.uid).on('value',(snapshot)=>{
	  			let state = this.state;
	  			state.saldo = parseFloat(snapshot.val().saldo).toFixed(2);
	  			state.nome = snapshot.val().nome;
	  			this.setState(state);
	  		});
	  		// olheiro do histórico
	  		firebase.database().ref('historico').child(user.uid).on('value',(snapshot)=>{
	  			let state = this.state;
	  			
	  			state.historico =[];

	  			snapshot.forEach((childItem)=>{
	  				state.historico.push({
	  					key:childItem.key,
	  					type:childItem.val().type,
	  					valor:childItem.val().valor,
	  					today:childItem.val().today
	  				});
	  			});
	  			this.setState(state);
	  		});
	  		
	  	}else{
	  		
	  		this.props.navigation.navigate('Home');
	  	}
	  });
	}

	addReceita(){
		this.props.navigation.navigate('AddReceita');
	}

	addDespesa(){
		this.props.navigation.navigate('AddDespesa');
	}
	sair(){
		firebase.auth().signOut();
	}

	render(){

		return(
			
				<View style={styles.container}>
					<View style={styles.header}>
						<View style={styles.nome}>
							<Text style={styles.txt}>User: {this.state.nome} </Text>
						</View>
						<View style={styles.saldo}>

							
							<Button title="X" onPress={this.sair}/>
						</View>
						
						
					</View>

					<FlatList
					scrollEnabled={true}
					data={this.state.historico}
					renderItem={({item})=> <HistoricoItem data={item}></HistoricoItem>}
					/>
					
					<View style={styles.saldo}>
						<Text style={styles.txt}> Residual: R$ {this.state.saldo} </Text>
					</View>
				
					<View style={styles.botoesArea}> 
						<Button title="+ Receita" onPress={this.addReceita} color='#00FFBF'/>
						<Button title="+ Despesa" onPress={this.addDespesa} color='#F5A9A9'/>
						
					</View>
				</View>
			
			);
	}
}

const styles = StyleSheet.create({
	
	container:{
		flex:1
		
	},
	header:{
		flexDirection:'row',
		justifyContent:'space-between',
		padding:10, 
		backgroundColor:'#FFFF00'

	},
	nome:{
		 
	},
	saldo:{ 
		alignSelf: 'center' 
	},
	txt:{
		fontSize:20,
		fontWeight:'bold'
	},	
	botoesArea:{
		flexDirection:'row',
		justifyContent:'space-around',
		paddingTop:10,
		paddingBottom:10,
		backgroundColor:'#DDDDDD'
	}
});

//desabilita as mensagens de warning
console.disableYellowBox = true;
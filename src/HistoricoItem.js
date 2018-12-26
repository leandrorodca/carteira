import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class HistoricoItem extends Component{


	constructor(props) {
	  super(props);
		let bg = '#00FFBF';
		let sinal = '+';
		if (this.props.data.type == 'despesa') {
			bg = '#F5A9A9';
			sinal = '-';
		}
	  this.state = {
	  	bg:bg,
	  	sinal:sinal
	  };
	}

	render(){
		return(

				<View style = {[styles.area, {backgroundColor:this.state.bg}]}>
					<Text style ={styles.msg} >{this.props.data.today}   </Text>
					<Text style ={styles.msg} >{this.state.sinal} R$ {this.props.data.valor}</Text>
				</View>

			);
	}



}
const styles = StyleSheet.create({
	area:{
		flex:1,
		flexDirection:'row',
		justifyContent:'space-between',
		padding:10,
		textAlignVertical:'center',
		borderBottomWidth:1
	},
	msg:{
		fontSize:20,
		fontWeight:'bold',
		textAlignVertical:'center'
	}
});

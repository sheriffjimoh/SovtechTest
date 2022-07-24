import React from 'react';
import {View,Text, TextInput, StyleSheet,TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons'; 

interface Props {
  onchangeText: (event: string) => void;
  onPress:()=> void;
  textValue: string
}


const  SearchBar: React.FC <Props> = ({onchangeText, onPress, textValue}) => {


  return(
      <View style={styles.searchContainer}>
               <View style={{width:20}}>
                  <Ionicons name="md-search" size={25} color="black" />
                 </View>
                 
                  <TextInput value={textValue}  placeholder='Search with any keywords'  onChangeText={onchangeText}  style={styles.input}/> 
                  
                  {textValue.length > 0 ?
                  <View style={{width:20}}>
                    <TouchableOpacity  onPress={onPress}>
                      <MaterialIcons name="clear" size={24} color="black" />
                    </TouchableOpacity>
                 </View>

                 : <View/>
                  }
               
      </View>
    )

}
const styles = StyleSheet.create({
    searchContainer:{
        flexDirection:'row',
        borderBottomColor:'black',
        borderBottomWidth:1,
        padding:10,
        justifyContent:'space-between'
    },
    input:{
      padding:5
    }
   
});


export default  SearchBar;

import React,{useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from "react-native";


export default  function DetailsScreen(props : any){
      const route = props.route;
      const Category = route.params.Category;
      const[getJokes, setJokes] = useState({icon_url:undefined, id:undefined, url:undefined, value:undefined});
      const[isLoading, setIsloading] = useState(true)

   
    useEffect(()=>{
       fetch(`https://api.chucknorris.io/jokes/random?category=${Category}`)
        .then(response => response.json())
       .then((data) => {

        console.log("Result  by categorys:",  data)
          
           setJokes(data);
       })
       .catch((error) => console.log(error))
       .finally(()=> setIsloading(false))
  },[]) 

  return(
      <View style={styles.container}>
            <Image
             source={{ uri: getJokes?.icon_url }}
            style={{ width: '100%', height: 200, backgroundColor:'#f4f4f4' }}
             />

             {isLoading ? 

                <Text>Loading joke..</Text>
            :
            <View style={styles.contentContainer}>

                

                 <Text style={styles.text}>
                         <Text style={{fontWeight:'bold', marginRight:5}}>
                            ID:  
                        </Text> {getJokes?.id}</Text>  
               
               
                 <Text style={styles.text}>
                     <Text style={{fontWeight:'bold', marginRight:5}}>
                             Url:
                        </Text> {getJokes?.url}</Text>
                 
                 
                 <Text style={styles.text}>
                     
                      <Text style={{fontWeight:'bold', marginRight:5}}>
                           Descripttion:
                        </Text> {getJokes?.value}</Text>
                  
            </View>
       }

      </View>
  )

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding:10
    },
    contentContainer:{
        padding:10
    },
    text:{
        fontSize:20,
        borderBottomColor:'#f4f4f4',
        borderBottomWidth:2,
        padding:5
    }
});
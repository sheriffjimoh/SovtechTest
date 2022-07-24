import React,{useState,useEffect}from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, RefreshControl} from "react-native";
import SearchBar from '../components/searchBar';

export default  function HomeScreen(props: any){

 const [getJokes, setJokes] = useState([]);
 const [isLoading, setIsloading] = useState(true); 
 const [textValue, setTextVlaue] = useState("")
 
 const navigation = props.navigation;

 function GetAllJokes() {
      fetch('https://api.chucknorris.io/jokes/categories')
        .then(response => response.json())
       .then((data) => {
          
           setJokes(data);
       })
       .catch((error) => console.log(error))
       .finally(()=> setIsloading(false))
 }

 useEffect(()=>{
      GetAllJokes();
  },[])




  function getcategoryFromSearch(arr: any[]){
   

    //  filter only result that has a category
    const categories = arr?.filter((item: { categories: 
       [] ; }) => item.categories.length > 0 );

        

    //    return only the categories
     const categoriesmaps = categories?.map((item: any) =>item.categories[0]
     )
   
     //  remove duplacet categories
     const  uniqueCategories = [...new Set(categoriesmaps)];

     return uniqueCategories;
  }



 const onchangeText = (event: any) => {

    setTextVlaue(event.toLowerCase());
    setIsloading(true)
    fetch(`https://api.chucknorris.io/jokes/search?query=${textValue}`)
        .then(response => response.json())
       .then((data) => {
        const filteredResults: any = getcategoryFromSearch(data.result);
         console.log("Search result:", filteredResults)
         setJokes(filteredResults);
       })
       .catch((error) => console.log(error))
       .finally(()=> setIsloading(false))
  };

  function CancleSearch() {
      if(textValue){
           setTextVlaue("");
           GetAllJokes()
      }
        
  }

  return(
      <View style={styles.container}>

          {/* search bar */}
           <SearchBar textValue={textValue} onPress={CancleSearch} onchangeText={(e: any)=>onchangeText(e)}/> 
         
         
               <View style={styles.header}>
                   <Text style={styles.headerText}>Categories List</Text>
               </View>

             
               <View style={styles.contentContainer}>

                   <ScrollView  refreshControl={<RefreshControl refreshing={isLoading}  onRefresh={() => GetAllJokes()}/>}  showsVerticalScrollIndicator={false}>

                   {
               !isLoading &&  getJokes?.length > 0 ?
                   getJokes?.map((item,index) =>(
                     <View key={index} style={styles.textContainer}>
                         <TouchableWithoutFeedback onPress={()=> navigation.navigate('Details', {
                           Category:item
                         } )}>

                          <Text style={styles.text}>{item}</Text>
                         </TouchableWithoutFeedback>
                      </View>
                   ))
                 : !isLoading && getJokes?.length == 0 ?
               
                <View  style={{justifyContent:'center', alignItems:'center'}}>
                      <Text>
                       No Jokes Found
                         <Text style={{fontWeight:'bold', fontSize:25}}>         {textValue? "For: "+textValue : ""}</Text>
                     </Text>
                 </View>

                 :
                 
                 <View  style={{justifyContent:'center', alignItems:'center'}}>
                      <Text>
                        Loading ....
                     </Text>
                 </View>
                
                }

                   </ScrollView>
                     
               </View>
                
           </View>
     
  )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding:10
    },
    categoriesContainer:{
        marginTop:20,
    },
    header:{
        marginTop:20,
        backgroundColor:'#f4f4f4',
        padding:10,
    },
    headerText:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'400'
    },
    contentContainer:{
        marginTop:20,
        paddingTop:10,
       marginBottom:30,
       flex:1
    },
    text:{
        fontSize:25
    },
    textContainer:{
        borderBottomColor:'#f4f4f4',
        borderBottomWidth:2,
        padding:10,
         marginBottom:10
    }
});
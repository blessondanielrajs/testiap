import React from "react";
import { Image  ,StyleSheet,View,TouchableOpacity,SafeAreaView,Dimensions,Text} from 'react-native'
import Menu from './menu.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Rating, AirbnbRating } from 'react-native-ratings';   
import Slider  from '@react-native-community/slider';
const {width,height}=Dimensions.get('window'); 
class App extends React.Component{
  state = {
   
    status: "",
    back:"music",
  };
  
  Menu=()=>{

    this.setState({ status: "menu" });
  }

  render()
  {
    console.log(this.state)
    return(
      <>
      {this.state.status === "menu" ? (<Menu data={this.state}/>)
              : (
             <SafeAreaView style={styles.container}>  
      <View style={{ flexDirection: 'row',height:70,backgroundColor: '#ffffff'} }>
        <TouchableOpacity 
           style={{marginLeft:10,alignContent:'center',alignSelf:'center'}}
           onPress={this.Menu}
            >
          <Image
           source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
           style={{ width: 25, height: 25, marginLeft: 6 }}
          />
        </TouchableOpacity>
        <Text 
        style = {{color: 'black',alignContent:'center',alignSelf:'center',marginLeft:20, 
        fontWeight:'bold',fontSize: 25,}}>
           Now Playing
        </Text>
        <TouchableOpacity 
           style={{marginLeft:150,alignContent:'center',alignSelf:'center'}}
           onPress={()=>{
            //this.props.navigation.navigate('DrawerOpen');
             this.props.navigation.openDrawer(); 
          }}
            >
          <Image
           source={{ uri: 'https://cdn-icons-png.flaticon.com/512/512/512222.png' }}
           style={{ width: 25, height: 25, marginLeft: 6 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.playing}>
 <Image source={require('../Images/player.jpg')} style={styles.image}></Image>
 </View >
<View style={{flexDirection:'row'}}>
    <Text h1 style={{
        fontSize:25,left:10,fontWeight:'bold',color: 'black',}}>Power of meditation</Text>
       <TouchableOpacity 
           style={{marginLeft:150,alignContent:'center',alignSelf:'center'}}
           onPress={()=>{
            //this.props.navigation.navigate('DrawerOpen');
             this.props.navigation.openDrawer(); 
          }}
            >
          <Image
           source={{ uri: 'https://t4.ftcdn.net/jpg/02/33/05/69/240_F_233056931_chB2vj6ThgrK2YRzKr9Ahg58XTw1K3Tn.jpg' }}
           style={{ width: 25, height: 25, marginLeft: -50 }}
          />

        </TouchableOpacity>
        </View>
        <View >
        <Text style={{
      fontSize:13,left:-2,color: 'black',marginTop:18,fontSize:12}}>This audio explains the power of meditations and its benifits
in life</Text>
 </View>
 <View style={{ flexDirection:'row'}}>
    <Text style={{left:-19 ,marginTop:25,color:'black'}}>Rate the content</Text>
    <Rating
  //showRating
  onFinishRating={this.ratingCompleted}
  style={{ paddingVertical: 10,margin:9,size:100 }}
/>
 </View>
 <View>
  <Slider style={styles.progressContainer}
 value={10}
 minimumValue={0}
 maximumValue={100}
 thumbTintColor="#FFD369"
 minimumTrackTintColor="#FFD369"
 maximumTrackTintColor="#FFF"
 onSlidingComplete={()=>{}}
/></View>
<View style={styles.progressLabelContainer}>
    <Text style={styles.progressLabelTxt}>0:00</Text>
    <Text style={styles.progressLabelTxt}>10.00</Text>
</View>
<View style={styles.musicControlls}>
<TouchableOpacity onPress={()=>{}}> 
    <Ionicons name="shuffle" size={35} color='#D0942A' style={{marginTop:25}}></Ionicons>
    </TouchableOpacity >
<TouchableOpacity onPress={()=>{}}>
 <Ionicons name="play-skip-back" size={35} color='#D0942A' style={{marginTop:25}}></Ionicons>
 </TouchableOpacity >
 <TouchableOpacity onPress={()=>{}}>
 <Ionicons name="ios-pause-circle" size={75} color='#D0942A'></Ionicons>
 </TouchableOpacity >
 <TouchableOpacity onPress={()=>{}}>
 <Ionicons name="play-skip-forward" size={35} color='#D0942A' style={{marginTop:25}}></Ionicons>
 </TouchableOpacity >
 <TouchableOpacity onPress={()=>{}}>
 <Ionicons name="repeat" size={35} color='#D0942A' style={{marginTop:25}}></Ionicons>
 </TouchableOpacity>
</View>
      </View>
 <View style={styles.bottomContainer }>
    <View style={styles.bottomControls}>
        <TouchableOpacity onPress={()=>{}}>
 <Ionicons name="snow-outline" size={30} color='#777777'></Ionicons>
 </TouchableOpacity >
 <TouchableOpacity onPress={()=>{}}>
 <Ionicons name="snow-outline" size={30} color='#777777'></Ionicons>
 </TouchableOpacity>
 <TouchableOpacity onPress={()=>{}}>
 <Ionicons name="repeat" size={30} color='#777777'></Ionicons>
 </TouchableOpacity>
 <TouchableOpacity onPress={()=>{}}>
 <Ionicons name="body-outline" size={30} color='#777777'></Ionicons>
 </TouchableOpacity>
 <TouchableOpacity onPress={()=>{}}>
 <Ionicons name="bonfire-sharp" size={30} color='#777777'></Ionicons>
 </TouchableOpacity>
 </View>
 </View>
      </SafeAreaView>
              )}
      </>
    )
  }
}
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    playing:{
width:380,
height:340,
//marginBottom:140,
marginTop:-5,
elevation:5
    },
    image:{
width:'90%',
height:'90%',
borderRadius:20,
left:20,
marginTop:8
    },
    container:{
        flex:1,
        backgroundColor:'#ffffff'
    },
    bottomContainer:{
        borderTopColor:'#F2F1EE',
        borderTopWidth:2 ,
        width:width,
        alignItems:'center',
        paddingVertical:15
    },
    bottomControls:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'80%'   
    },
    progressContainer:{
        width:350,
        height:40,
        marginTop:-10,
        marginBottom:-100,
        flexDirection:'row'
    },
    progressLabelContainer:{
        width:340,
        flexDirection:'row',
        justifyContent:'space-between', 
        margin:20
    },
    progressLabelTxt:{
        color:'#000000'
    },
    musicControlls:{
        flexDirection:'row',
width:'60%',
justifyContent:'space-between',
marginTop:-25,
paddingVertical:10,
justifyContent:'space-between',
width:'80%'
    },

})

export default App;

const { StyleSheet } = require("react-native");

const prefernceStyle = StyleSheet.create({
    container:{
        backgroundColor:"#fcfdff",
        flex:1,
        // justifyContent:"center",
        // alignItems:"center",
        paddingHorizontal:20,
        paddingVertical:50
    },
    iconContainer:{
        backgroundColor:"#F4F4F4",
        padding:5,
        borderRadius:8,
        width:35,
        marginBottom:20
    },
    txt:{
        marginBottom:20,
        fontSize:20,
        fontWeight:"bold",
    },
    btn:{
        backgroundColor:"#2666CF",
        height:50,
        justifyContent:"center",
        alignItems:"center",
        marginTop:20,
        borderRadius:5
    },
    btnTxt:{
        color:"#ffff",
        fontWeight:"bold",
        fontSize:15
    },
    btnContainer:{
        flexDirection:"row",
        alignItems:"center",
        marginVertical:20
    },
    btn1:{
        backgroundColor:"#B6D3F9",
        justifyContent:"center",
        alignItems:"center",
        width:88,
        height:40,
        marginRight:20,
        borderRadius:5
    },
    btn2:{
        backgroundColor:"#FAFAFA",
        justifyContent:"center",
        alignItems:"center",
        width:88,
        height:40,
        borderRadius:5
    }
})

export default prefernceStyle
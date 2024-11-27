const { StyleSheet } = require("react-native");

const nameStyle = StyleSheet.create({
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
    numberTxt:{
        color:"#454f60",
    },
    txt:{
        marginBottom:20,
        fontSize:20,
        fontWeight:"bold",
    },
    label:{
        color:"gray",
        marginBottom:5
    },
    label2:{
        color:"gray",
        marginTop:20,
        marginBottom:5
    },

    input:{
        backgroundColor:"#F4F4F4",
        borderRadius:10,
        width:50,
        height:50,
        paddingHorizontal:20
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
    }
})

export default nameStyle
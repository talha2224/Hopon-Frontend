const { StyleSheet } = require("react-native");

const Indexstyle = StyleSheet.create({
    container:{
        backgroundColor:"#2666cf",
        flex:1,
        justifyContent:"center",
        alignItems:"center"
        // #3474ff
    },
    logoContainer:{
        backgroundColor:"#3474ff",
        width:80,
        height:80,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center"
    },
    logo:{
        width:180,
        height:180,
    },
    txt:{
        marginTop:-40,
        fontSize:20,
        fontWeight:"bold",
        color:"#ffff"
    }
})

export default Indexstyle

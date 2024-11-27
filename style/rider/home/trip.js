const { StyleSheet } = require("react-native");

const tripStyle = StyleSheet.create({

    container: {
        backgroundColor: "white",
        flex: 1,
        position:"relative",
    },
    containerDark: {
        backgroundColor: "#000",
        flex: 1,
        position:"relative",
    },
    Scrollcontainer: {
        // flex:1,
        // position:"relative",
    },
    iconContainer:{
        backgroundColor:"#F4F4F4",
        padding:5,
        borderRadius:8,
        width:35,
        marginBottom:20
    },
    iconContainerDark:{
        backgroundColor:"#292929",
        padding:5,
        borderRadius:8,
        width:35,
        marginBottom:20
    },
    btnContainer:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#F4F4F4",
        borderRadius:30,
        marginTop:20,
        paddingVertical:10,
        height:60,
        paddingHorizontal:10,
        justifyContent:"space-between"
    },
    btnContainerDark:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#292929",
        borderRadius:30,
        marginTop:20,
        paddingVertical:10,
        height:60,
        paddingHorizontal:10,
        justifyContent:"space-between"
    },
    btn1:{
        // flex:1,
        backgroundColor:"#FFFF",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:30,
        height:40,
        padding:9
    },
    btn2:{
        // flex:1,
        padding:9
    },
    btn1Txt:{
        fontWeight:"bold",
    },
    btn2Txt:{
        color:"#454f60",
        fontWeight:"bold",
    },
})

export default tripStyle
const { StyleSheet } = require("react-native");

const homeStyle = StyleSheet.create({

    container: {
        backgroundColor: "#fcfdff",
        flex: 1,
        position:"relative",
    },
    containerDark: {
        backgroundColor: "#000",
        flex: 1,
        position:"relative",
    },
    Scrollcontainer: {
        flex:1,
        position:"relative",
    },
    map: {
        width: '100%',
        height: '100%',
    },
    topBar:{
        position:"absolute",
        top:30,
        left:0,
        right:0,
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        paddingHorizontal:20
    },
    btnContainer:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#F4F4F4",
        borderRadius:20,
        paddingRight:20,
        height:30,
        width:"auto"
    },
    btnContainerDark:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#000",
        borderRadius:20,
        paddingRight:20,
        height:30,
        width:"auto"
    },
    btn1:{
        backgroundColor:"#FFFF",
        marginRight:20,
        marginLeft:5,
        paddingHorizontal:20,
        paddingVertical:3,
        borderRadius:20,

    },
    btn2Txt:{
        color:"#454f60",
    },
    btn2TxtDark:{
        color:"#ffff",
    },
    locationContainer:{
        position:"absolute",
        top:90,
        left:0,
        right:0,
        justifyContent:"center",
        alignItems:"center",
    },
    location:{
        backgroundColor:"white",
        padding:10,
        borderRadius:10
    },
    locationDark:{
        backgroundColor:"#000",
        padding:10,
        borderRadius:10
    },
    timeContainer:{
        position:"absolute",
        top:387,
        left:0,
        right:0,
        justifyContent:"center",
        alignItems:"center",
    },
    time:{
        backgroundColor:"#2666CF",
        padding:10,
        borderRadius:10
    },
    requestContainer:{
        position:"absolute",
        top:559,
        left:0,
        right:0,
        justifyContent:"center",
        alignItems:"center",
    },
    request:{
        backgroundColor:"#ffff",
        padding:10,
        borderRadius:10
    },
    popupContainer:{
        position:"absolute",
        top:0,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    popu:{
        backgroundColor:"#fff",
        padding:10,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center"
    },
    popuDark:{
        backgroundColor:"#292929",
        padding:10,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center"
    },
    popuDark2:{
        backgroundColor:"#13182F",
        padding:10,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default homeStyle
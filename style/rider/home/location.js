const { StyleSheet } = require("react-native");

const locationStyle = StyleSheet.create({

    container: {
        backgroundColor: "#fcfdff",
        flex: 1,
        position:"relative",
    },
    containerDark:{
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
        height: '50%',
    },
    map2: {
        width: '100%',
        height: '65%',
    },
    topBar:{
        position:"relative",
        top:60,
        left:0,
        right:0,
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        paddingHorizontal:20,
        zIndex:1000
    },
    cards: {
        flexDirection: "row",
        padding: 2,
        padding: 20,
    },
    popupContainer:{
        position:"absolute",
        top:0,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    popu:{
        backgroundColor:"#fff",
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center"
    },
    popuDark:{
        backgroundColor:"#000",
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center"
    }
    

})

export default locationStyle
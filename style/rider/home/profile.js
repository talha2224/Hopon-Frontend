const { StyleSheet } = require("react-native");

const notificationStyle = StyleSheet.create({

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
    containerDark2: {
        backgroundColor: "#13182F",
        flex: 1,
        position:"relative",
    },
    Scrollcontainer: {
        flex:1,
        position:"relative",
        backgroundColor:"#F9F9F9",
        padding:10
    },
    ScrollcontainerDark: {
        flex:1,
        position:"relative",
        backgroundColor:"#272727",
        padding:10
    },
    iconContainer:{
        backgroundColor:"#F9F9F9",
        padding:5,
        borderRadius:8,
        width:35,
        marginBottom:20
    },

})

export default notificationStyle
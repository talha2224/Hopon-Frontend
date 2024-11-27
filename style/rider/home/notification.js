const { StyleSheet } = require("react-native");

const notificationStyle = StyleSheet.create({

    container: {
        backgroundColor: "white",
        flex: 1,
        position:"relative",
    },
    containerDark: {
        backgroundColor: "black",
        flex: 1,
        position:"relative",
    },
    Scrollcontainer: {
        flex:1,
        position:"relative",
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

})

export default notificationStyle
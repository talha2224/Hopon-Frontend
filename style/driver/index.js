const { StyleSheet } = require("react-native");

const indexstyle = StyleSheet.create({
    container:{
        backgroundColor:"#fcfdff",
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:20
    },
    logoContainer:{
        backgroundColor:"#3474ff",
        width:80,
        height:80,
        borderRadius:20
    },
    logo:{
        width:180,
        height:180,
    },
    welcome:{
        textAlign:"center",
        marginTop:0,
        fontSize:30,
        fontWeight:"600"
    },
    btnContainer:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#F4F4F4",
        borderRadius:30,
        marginTop:20,
        paddingVertical:10,
        height:60
    },
    btn2:{
        flex:1,
        backgroundColor:"#FFFF",
        marginHorizontal:10,
        paddingHorizontal:20,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:30,
        height:40,
        marginRight:30

    },
    btn1:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    btn2Txt:{
        fontWeight:"bold",
        fontSize:16
    },
    btn1Txt:{
        color:"#454f60",
        fontWeight:"bold",
        fontSize:16
    },
    methods:{
        backgroundColor:"#fafafa",
        height:50,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        marginTop:20,
        flexDirection:"row"
    },
    img:{
        maxWidth:30,
        maxHeight:30
    },
    methodsTxt:{
        color:"#454f60",
        marginLeft:10
    },
    or:{
        color:"#454f60",
        fontWeight:"bold",
        marginVertical:20
    },
    numberTxt:{
        color:"#454f60",
    },
    phoneContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginTop:10,
        height:50
    },
    country:{
        marginRight:5,
        backgroundColor:"#F4F4F4",
        width:50,
        height:50,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center"
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

export default indexstyle
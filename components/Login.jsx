import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function Login() {
    return (
        <View>
            <Image
                source={require("./../assets/images/login.jpeg")}
                style={{
                    width: "100%",
                    height: 450,
                }}
            />
            <View style={styles.container}>
                <Text
                    style={{
                        fontSize: 28,
                        fontFamily: 'outfit-bold',
                        textAlign: "center",
                    }}
                >AI TRAVEL PLANNER 31:47</Text>

                <Text
                style={{
                    fontFamily:'outfit',
                    fontSize:17,
                    textAlign:"center",
                    color:Colors.GRAY,
                }}
                >Discover your next adventure
                    effortlessly. Personalized
                    itineraries at your fingertips. Travel
                    smarter with Al-driven insights."</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        marginTop: -20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: '100%',
        padding: 15,
    }
})
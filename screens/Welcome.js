import { View, Text, Pressable, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constants/colors';

const Welcome = () => {
    const navigation = useNavigation();
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            <View>
                <Image
                    source={require("../assets/images/login.jpg")}
                    style={{
                        height: 390,
                        width: 390,
                        borderRadius: 0,
                        top: 0,
                        transform: [{ translateX: 0 }, { translateY: 0 }],
                    }}
                />
            </View>
            {/* content */}
            <View style={{
                paddingHorizontal: 22,
                position: 'absolute',
                top: 420,
                width: "100%"
            }}>
                <Text style={{ fontSize: 30, fontWeight: 800 }}>
                    Welcome!
                </Text>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
                        User ID
                    </Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='User ID'
                            placeholderTextColor={COLORS.black}
                            style={{ width: "100%" }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>
                        Password
                    </Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            style={{ width: "100%" }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{ position: 'absolute', right: 12 }}
                        >
                            <Ionicons name={isPasswordShown ? "eye-off" : "eye"} size={24} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>

                    <Pressable onPress={() => navigation.navigate("ForgotPass")}>
                        <Text style={{
                            marginTop: 7,
                            fontSize: 15,
                            fontWeight: "bold",
                            marginLeft: 4
                        }}>
                            Forgot Password
                        </Text>
                    </Pressable>
                </View>

                <TouchableOpacity
                    style={{
                        marginTop: 22,
                        width: "100%",
                        backgroundColor: COLORS.primary,
                        alignItems: "center",
                        padding: 10,
                        borderRadius: 8
                    }}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={{ color: COLORS.white, fontSize: 16 }}>Login</Text>
                </TouchableOpacity>

                <View style={{
                    flexDirection: "row",
                    marginTop: 12,
                    justifyContent: "center",
                }}>
                    <Text style={{ fontSize: 16 }}>Not a Member?</Text>
                    <Pressable onPress={() => navigation.navigate("Signup")}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 4 }}>
                            Register Now
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default Welcome;
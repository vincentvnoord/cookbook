import React, { useState } from "react";
import { Modal, View, TouchableOpacity, Text } from "react-native";
import { MotiView } from "moti";


export const EditableElement = ({ children, editElement }: { children: React.ReactNode, editElement: React.ReactNode }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const transitionSpeed = 100;

    const closeModal = () => {
        console.log("close modal");
        setIsEditing(false);
        // Delay unmount to allow animations to complete
        setTimeout(() => setIsModalVisible(false), transitionSpeed); // Match animation duration
    };

    const openModal = () => {
        setIsModalVisible(true);
        setTimeout(() => setIsEditing(true), 10); // Ensure animation start
    };

    return (
        <>
            {isModalVisible && (
                <Modal transparent>
                    {/* Backdrop */}
                    {isEditing && (
                        <MotiView
                            animate={isEditing ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ type: 'spring', duration: transitionSpeed * 10 }}
                            className="absolute pointer-events-none z-50 backdrop:blur-xl inset-0 bg-black/50"
                        />
                    )}
                    {/* Modal Content */}
                    <View className="absolute p-4 z-50 inset-0 flex items-center justify-center">
                        <MotiView
                            from={{ translateY: 100, opacity: 0 }}
                            animate={isEditing ? { translateY: 0, opacity: 1 } : { translateY: 100, opacity: 0 }}
                            transition={{ type: 'spring', duration: transitionSpeed * 5 }}
                            className="bg-white p-4 flex flex-col rounded-lg shadow-lg"
                        >
                            <View className="flex flex-col gap-4">
                                {editElement}
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPressIn={closeModal}
                                >
                                    <Text className="bg-red-50 p-3 font-semibold">Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </MotiView>
                    </View>
                </Modal>
            )}
            <TouchableOpacity onPressOut={openModal}>
                {children}
            </TouchableOpacity>
        </>
    );
};

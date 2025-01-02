import React, { useState, useEffect, useRef, SetStateAction } from "react";
import { View, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData, Pressable } from "react-native";


export const AddInstructions = ({ initialInstruction, onInstructionsChange }: { initialInstruction?: string[], onInstructionsChange: (instructions: string[]) => void; }) => {
    const [instructions, setInstructions] = useState<string[]>(initialInstruction ?? []);
    const [newInstruction, setNewInstruction] = useState("");
    const [focusedInstruction, setFocusedInstruction] = useState(-1);

    const onNewIngredientChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        e.preventDefault();
        const text = e.nativeEvent.text;
        const newInstructions = [...instructions, text];
        setInstructions(newInstructions);
        onInstructionsChange(newInstructions);

        setNewInstruction("");
        setFocusedInstruction(instructions.length);
    }

    useEffect(() => {
        setInstructions(initialInstruction ?? []);
    }, [initialInstruction]);

    return (
        <>
            <View className="flex flex-col gap-1">
                {instructions.map((instruction, index) => (<Instruction key={index} focusedInstruction={focusedInstruction} index={index} instructions={instructions} setInstructions={setInstructions} />))}
            </View>
            <TextInput onChange={onNewIngredientChange} value={newInstruction} className="border-b" placeholder="New Instruction" />
        </>
    )
}

const Instruction = ({ index, focusedInstruction, instructions, setInstructions }:
    {
        index: number,
        focusedInstruction: number,
        instructions: string[],
        setInstructions: React.Dispatch<SetStateAction<string[]>>
    }) => {
    const input = useRef<TextInput>(null);

    useEffect(() => {
        if (focusedInstruction === index) {
            input.current?.focus();
        }
    }, [focusedInstruction, index]);

    const onInstructionChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const text = e.nativeEvent.text;
        instructions[index] = text;
        setInstructions([...instructions]);
    }

    return (
        <Pressable onPress={() => { setInstructions(instructions.filter((_, i) => i !== index)) }}>
            <View className="bg-slate-200 p-2 rounded-lg justify-start flex flex-row">
                <Text className="">{index + 1}.</Text>
                <TextInput multiline className="p-0" ref={input} value={instructions[index]} onChange={onInstructionChange} />
            </View>
        </Pressable>
    )
}
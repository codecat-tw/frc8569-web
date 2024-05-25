// components/AddItem.js
import { useState } from 'react';
import db from '../../utils/firestore';
import { collection, addDoc } from "firebase/firestore"; 

const AddItem = () => {
    const [value, setValue] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "activity"), {
                name: value
            });
            console.log("Document written with ID: ", docRef.id);
            setValue(''); // Clear the form
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Add a new item"
            />
            <button type="submit">申請場地</button>
        </form>
    );
};

export default AddItem;
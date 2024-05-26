import { useState } from 'react';
import { collection, setDoc, doc } from "firebase/firestore";
import db from '../../utils/firestore';

const AddItem = ( { userEmail } ) => {
    // 使用 useState 管理多個輸入框的值
    const [formValues, setFormValues] = useState({
        date: '',
        name: '',
        start: '',
        end: ''
    });

    // 更新輸入框的值
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    // 表單提交處理函數
    const handleSubmit = async (event) => {
        event.preventDefault();
        // 確保所有輸入框都有值
        const { date, name, start, end } = formValues;
        if (name && name && start && end ) {
            try {
                // 使用名字作為文件名
                const docRef = doc(collection(db, "activity"), date);
                await setDoc(docRef, {
                    ...formValues,
                    email: userEmail // 使用傳遞進來的郵件地址
                });
                console.log("Document written with ID: ", docRef.id);
                // 清空表單
                setFormValues({
                    date: '',
                    name: '',
                    start: '',
                    end: ''
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            console.log("All fields are required.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
            <input
                type="date"
                name="date"
                value={formValues.date}
                onChange={handleInputChange}
                placeholder="Date"
                required
            />
            </div>
            <div>
            <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
            />
            </div>
            <div>
            <input
                type="time"
                name="start"
                value={formValues.start}
                onChange={handleInputChange}
                placeholder="Start"
                required
            />
            </div>
            <div>
            <input
                type="time"
                name="end"
                value={formValues.end}
                onChange={handleInputChange}
                placeholder="End"
                required
            />
            </div>
            <button type="submit">提交申請</button>
        </form>
    );
};

export default AddItem;

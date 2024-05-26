import { useState } from 'react';
import { collection, setDoc, doc } from "firebase/firestore";
import db from '../../utils/firestore';

const AddItem = ({ applyEmail }) => {
    // 使用 useState 管理多個輸入框的值
    const [formValues, setFormValues] = useState({
        date: '',
        name: '',
        start: '',
        end: '',
        area: ''
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
        const { date, name, start, end, area } = formValues;
        if (name && name && start && end && area) {
            try {
                // 使用名字作為文件名
                const docRef = doc(collection(db, "activity"), date);
                await setDoc(docRef, {
                    ...formValues,
                    apply: applyEmail // 使用傳遞進來的郵件地址
                });
                console.log("Document written with ID: ", docRef.id);
                // 清空表單
                setFormValues({
                    date: '',
                    name: '',
                    start: '',
                    end: '',
                    area: ''
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
                <label>活動日期</label>
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
                <label>活動名稱</label>
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
                <label>開始時間</label>
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
                <label>結束時間</label>
                <input
                    type="time"
                    name="end"
                    value={formValues.end}
                    onChange={handleInputChange}
                    placeholder="End"
                    required
                />
            </div>
            <div>
                <label>使用分區</label>
                <input
                    type="text"
                    name="area"
                    value={formValues.area}
                    onChange={handleInputChange}
                    placeholder="Area"
                    required
                />
            </div>
            <button type="submit">提交申請</button>
        </form>
    );
};

export default AddItem;

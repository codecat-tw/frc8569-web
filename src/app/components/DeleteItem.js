import db from "../../utils/firestore"
import { doc, deleteDoc } from "firebase/firestore"

const DeleteItem = ({ id }) => {
  const handleDelete = async () => {
    const itemRef = doc(db, "items", id)
    try {
      await deleteDoc(itemRef)
      alert("Item deleted successfully")
    } catch (error) {
      console.error("Error deleting document: ", error)
      alert("Error deleting item")
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="border bg-red-400 p-1 rounded text-white"
    >
      Delete Item
    </button>
  )
}

export default DeleteItem
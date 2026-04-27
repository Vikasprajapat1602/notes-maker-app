function NoteForm({
  addNote,
  editNote,
  updateNote,
  formData,
  setFormData,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) return;

    if (editNote) {
      updateNote(
        formData.title,
        formData.content,
        formData.category
      );
    } else {
      addNote(
        formData.title,
        formData.content,
        formData.category
      );
    }

    setFormData({
      title: "",
      content: "",
      category: "Study",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800"
    >
      <h2 className="text-xl font-semibold text-white mb-4">
        {editNote ? "Edit Note" : "Create a New Note"}
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Enter note title..."
        value={formData.title}
        onChange={handleChange}
        className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      />

      <textarea
        name="content"
        placeholder="Write your note here..."
        rows="5"
        value={formData.content}
        onChange={handleChange}
        className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      ></textarea>

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <option value="Study">Study</option>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
      </select>

      <button
        type="submit"
        className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition"
      >
        {editNote ? "Update Note" : "Save Note"}
      </button>
    </form>
  );
}

export default NoteForm;
function NoteCard({
  note,
  deleteNote,
  setEditNote,
  setFormData,
}) {
  const handleEdit = () => {
    setEditNote(note);

    setFormData({
      title: note.title,
      content: note.content,
      category: note.category || "Study",
    });
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-2">
        {note.title}
      </h3>

      <p className="text-gray-300 mb-2 whitespace-pre-wrap">
        {note.content}
      </p>

      <p className="text-sm text-gray-400 mb-1">
        Category: {note.category || "Study"}
      </p>

      <p className="text-xs text-gray-500 mb-4">
        {note.createdAt}
      </p>

      <div className="flex gap-3">
        <button
          onClick={handleEdit}
          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition"
        >
          Edit
        </button>

        <button
          onClick={() => deleteNote(note.id)}
          className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
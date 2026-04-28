function TrashBin({
  trashNotes,
  restoreNote,
  deleteForever,
}) {
  if (!trashNotes.length) return null;

  return (
    <div className="max-w-6xl mx-auto mt-12">
      <h2 className="text-2xl font-bold text-white mb-6">
        Trash Bin
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trashNotes.map((note) => (
          <div
            key={note.id}
            className="bg-gray-800 border border-gray-700 rounded-xl p-5"
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              {note.title}
            </h3>

            <p className="text-gray-300 mb-4">
              {note.content}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => restoreNote(note.id)}
                className="bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg"
              >
                Restore
              </button>

              <button
                onClick={() => deleteForever(note.id)}
                className="bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg"
              >
                Delete Forever
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrashBin;
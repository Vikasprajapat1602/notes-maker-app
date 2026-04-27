function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="w-full max-w-2xl mx-auto my-6">
      <input
        type="text"
        placeholder="Search your notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
    </div>
  );
}

export default SearchBar;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGrowers, Grower } from '../../context/GrowerContext';
import { Search as SearchIcon, Edit, Trash2 } from 'lucide-react';

const Search: React.FC = () => {
  const { growers, deleteGrower } = useGrowers();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Grower[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = growers.filter(grower => 
      grower.growerName.toLowerCase().includes(term) ||
      grower.hybridName.toLowerCase().includes(term) ||
      grower.village.toLowerCase().includes(term) ||
      grower.fatherName.toLowerCase().includes(term)
    );
    
    setSearchResults(results);
    setHasSearched(true);
  };

  const handleEdit = (id: string) => {
    navigate(`/user/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this grower?')) {
      deleteGrower(id);
      // Update search results after deletion
      setSearchResults(prev => prev.filter(grower => grower.id !== id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Search Growers</h1>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, hybrid, village..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {hasSearched && (
        <div>
          {searchResults.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600">No growers found matching your search.</p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-600 mb-3">Found {searchResults.length} results</p>
              <div className="space-y-4">
                {searchResults.map((grower) => (
                  <div key={grower.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-green-600 text-white px-4 py-2 flex justify-between items-center">
                      <h2 className="font-semibold">{grower.growerName}</h2>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEdit(grower.id)}
                          className="text-white hover:text-green-200"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(grower.id)}
                          className="text-white hover:text-red-200"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600">Hybrid Name</p>
                        <p className="font-medium">{grower.hybridName}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Father's Name</p>
                        <p className="font-medium">{grower.fatherName}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Village</p>
                        <p className="font-medium">{grower.village}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Acres</p>
                        <p className="font-medium">{grower.acres}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
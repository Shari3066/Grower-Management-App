import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGrowers } from '../../context/GrowerContext';
import { Edit, Trash2 } from 'lucide-react';

const Home: React.FC = () => {
  const { growers, deleteGrower } = useGrowers();
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/user/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this grower?')) {
      deleteGrower(id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Grower Details</h1>
      
      {growers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600">No grower details available. Add a new grower to get started.</p>
          <button 
            onClick={() => navigate('/user/add')}
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
          >
            Add Grower
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {growers.map((grower) => (
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
                <div>
                  <p className="text-gray-600">Female Sow Date</p>
                  <p className="font-medium">{grower.femaleSowDate}</p>
                </div>
                <div>
                  <p className="text-gray-600">Male Sow Date</p>
                  <p className="font-medium">{grower.maleSowDate}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500">
                Added on {formatDate(grower.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
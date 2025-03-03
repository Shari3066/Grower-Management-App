import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGrowers } from '../../context/GrowerContext';
import { useUser } from '../../context/UserContext';

const AddGrower: React.FC = () => {
  const { addGrower } = useGrowers();
  const { currentUser } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    hybridName: '',
    growerName: '',
    fatherName: '',
    village: '',
    acres: '',
    gpsCoordinates: '',
    femaleSowDate: '',
    maleSowDate: '',
    femalePackets: '',
    malePackets: '',
    femaleLotNo: '',
    maleLotNo: '',
    remarks: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addGrower({
      ...formData,
      acres: parseFloat(formData.acres) || 0,
      femalePackets: parseInt(formData.femalePackets) || 0,
      malePackets: parseInt(formData.malePackets) || 0,
      createdBy: currentUser?.username || 'Unknown'
    });
    
    navigate('/user');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Add New Grower</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="hybridName" className="block text-sm font-medium text-gray-700 mb-1">
                Hybrid Name
              </label>
              <input
                id="hybridName"
                name="hybridName"
                type="text"
                value={formData.hybridName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="growerName" className="block text-sm font-medium text-gray-700 mb-1">
                Grower Name
              </label>
              <input
                id="growerName"
                name="growerName"
                type="text"
                value={formData.growerName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-1">
                Father Name
              </label>
              <input
                id="fatherName"
                name="fatherName"
                type="text"
                value={formData.fatherName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-1">
                Village
              </label>
              <input
                id="village"
                name="village"
                type="text"
                value={formData.village}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="acres" className="block text-sm font-medium text-gray-700 mb-1">
                Acres
              </label>
              <input
                id="acres"
                name="acres"
                type="number"
                step="0.01"
                value={formData.acres}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="gpsCoordinates" className="block text-sm font-medium text-gray-700 mb-1">
                GPS Coordinates
              </label>
              <input
                id="gpsCoordinates"
                name="gpsCoordinates"
                type="text"
                value={formData.gpsCoordinates}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 12.9716° N, 77.5946° E"
                required
              />
            </div>
            
            <div>
              <label htmlFor="femaleSowDate" className="block text-sm font-medium text-gray-700 mb-1">
                Female Sow Date
              </label>
              <input
                id="femaleSowDate"
                name="femaleSowDate"
                type="date"
                value={formData.femaleSowDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="maleSowDate" className="block text-sm font-medium text-gray-700 mb-1">
                Male Sow Date
              </label>
              <input
                id="maleSowDate"
                name="maleSowDate"
                type="date"
                value={formData.maleSowDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="femalePackets" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Female Packets
              </label>
              <input
                id="femalePackets"
                name="femalePackets"
                type="number"
                value={formData.femalePackets}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="malePackets" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Male Packets
              </label>
              <input
                id="malePackets"
                name="malePackets"
                type="number"
                value={formData.malePackets}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="femaleLotNo" className="block text-sm font-medium text-gray-700 mb-1">
                Female Lot No
              </label>
              <input
                id="femaleLotNo"
                name="femaleLotNo"
                type="text"
                value={formData.femaleLotNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="maleLotNo" className="block text-sm font-medium text-gray-700 mb-1">
                Male Lot No
              </label>
              <input
                id="maleLotNo"
                name="maleLotNo"
                type="text"
                value={formData.maleLotNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-1">
              Remarks
            </label>
            <textarea
              id="remarks"
              name="remarks"
              rows={3}
              value={formData.remarks}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/user')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save Grower
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGrower;
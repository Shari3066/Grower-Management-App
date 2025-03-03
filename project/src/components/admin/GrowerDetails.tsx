import React, { useState } from 'react';
import { useGrowers, Grower } from '../../context/GrowerContext';
import { Search, Download, Filter, Eye } from 'lucide-react';
import * as XLSX from 'xlsx';

const GrowerDetails: React.FC = () => {
  const { growers } = useGrowers();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    village: '',
    hybridName: '',
    dateFrom: '',
    dateTo: '',
  });
  const [selectedGrower, setSelectedGrower] = useState<Grower | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled in the filtered growers calculation
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredGrowers = growers.filter(grower => {
    const matchesSearch = searchTerm === '' || 
      grower.growerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grower.hybridName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grower.village.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesVillage = filters.village === '' || grower.village === filters.village;
    const matchesHybrid = filters.hybridName === '' || grower.hybridName === filters.hybridName;
    
    let matchesDate = true;
    if (filters.dateFrom && filters.dateTo) {
      const growerDate = new Date(grower.femaleSowDate);
      const fromDate = new Date(filters.dateFrom);
      const toDate = new Date(filters.dateTo);
      matchesDate = growerDate >= fromDate && growerDate <= toDate;
    }
    
    return matchesSearch && matchesVillage && matchesHybrid && matchesDate;
  });

  const uniqueVillages = Array.from(new Set(growers.map(g => g.village)));
  const uniqueHybrids = Array.from(new Set(growers.map(g => g.hybridName)));

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredGrowers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Growers');
    XLSX.writeFile(workbook, 'grower_details.xlsx');
  };

  const viewGrowerDetails = (grower: Grower) => {
    setSelectedGrower(grower);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Grower Details</h1>
        <button 
          onClick={exportToExcel}
          className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
        >
          <Download className="h-5 w-5" />
          <span>Export to Excel</span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <form onSubmit={handleSearch} className="flex items-center mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, hybrid, village..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>
        
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
          >
            <Filter className="h-4 w-4" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
          
          <p className="text-sm text-gray-600">
            {filteredGrowers.length} growers found
          </p>
        </div>
        
        {showFilters && (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-md">
            <div>
              <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-1">
                Village
              </label>
              <select
                id="village"
                name="village"
                value={filters.village}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Villages</option>
                {uniqueVillages.map(village => (
                  <option key={village} value={village}>{village}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="hybridName" className="block text-sm font-medium text-gray-700 mb-1">
                Hybrid
              </label>
              <select
                id="hybridName"
                name="hybridName"
                value={filters.hybridName}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Hybrids</option>
                {uniqueHybrids.map(hybrid => (
                  <option key={hybrid} value={hybrid}>{hybrid}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <input
                id="dateFrom"
                name="dateFrom"
                type="date"
                value={filters.dateFrom}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <input
                id="dateTo"
                name="dateTo"
                type="date"
                value={filters.dateTo}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grower Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hybrid
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Village
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acres
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Female Sow Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredGrowers.map((grower) => (
              <tr key={grower.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {grower.growerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {grower.hybridName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {grower.village}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {grower.acres}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {grower.femaleSowDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => viewGrowerDetails(grower)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Grower Details Modal */}
      {selectedGrower && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Grower Details</h2>
              <button 
                onClick={() => setSelectedGrower(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Basic Information</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="mb-2">
                    <p className="text-sm text-gray-600">Grower Name</p>
                    <p className="font-medium">{selectedGrower.growerName}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-600">Father's Name</p>
                    <p className="font-medium">{selectedGrower.fatherName}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-600">Village</p>
                    <p className="font-medium">{selectedGrower.village}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">GPS Coordinates</p>
                    <p className="font-medium">{selectedGrower.gpsCoordinates}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Crop Information</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="mb-2">
                    <p className="text-sm text-gray-600">Hybrid Name</p>
                    <p className="font-medium">{selectedGrower.hybridName}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-600">Acres</p>
                    <p className="font-medium">{selectedGrower.acres}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-600">Female Sow Date</p>
                    <p className="font-medium">{selectedGrower.femaleSowDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Male Sow Date</p>
                    <p className="font-medium">{selectedGrower.maleSowDate}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Packet Information</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="mb-2">
                    <p className="text-sm text-gray-600">Female Packets</p>
                    <p className="font-medium">{selectedGrower.femalePackets}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-600">Male Packets</p>
                    <p className="font-medium">{selectedGrower.malePackets}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-600">Female Lot No</p>
                    <p className="font-medium">{selectedGrower.femaleLotNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Male Lot No</p>
                    <p className="font-medium">{selectedGrower.maleLotNo}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Additional Information</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="mb-2">
                    <p className="text-sm text-gray-600">Remarks</p>
                    <p className="font-medium">{selectedGrower.remarks || 'No remarks'}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-600">Created By</p>
                    <p className="font-medium">{selectedGrower.createdBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Created At</p>
                    <p className="font-medium">{new Date(selectedGrower.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedGrower(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrowerDetails;
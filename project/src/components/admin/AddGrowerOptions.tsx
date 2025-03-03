import React, { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';

interface Option {
  id: string;
  name: string;
  values: string[];
}

const AddGrowerOptions: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([
    { 
      id: '1', 
      name: 'Hybrid Types', 
      values: ['Corn Hybrid A', 'Corn Hybrid B', 'Corn Hybrid C'] 
    },
    { 
      id: '2', 
      name: 'Villages', 
      values: ['Greenfield', 'Harvest Valley', 'Cornville', 'Meadowbrook'] 
    }
  ]);
  
  const [newOption, setNewOption] = useState({ name: '', values: '' });
  const [editingOption, setEditingOption] = useState<Option | null>(null);
  const [newValue, setNewValue] = useState('');

  const handleAddOption = () => {
    if (!newOption.name || !newOption.values) return;
    
    const option: Option = {
      id: Date.now().toString(),
      name: newOption.name,
      values: newOption.values.split(',').map(v => v.trim())
    };
    
    setOptions([...options, option]);
    setNewOption({ name: '', values: '' });
  };

  const handleDeleteOption = (id: string) => {
    if (window.confirm('Are you sure you want to delete this option?')) {
      setOptions(options.filter(option => option.id !== id));
    }
  };

  const handleEditOption = (option: Option) => {
    setEditingOption(option);
  };

  const handleAddValue = () => {
    if (!newValue || !editingOption) return;
    
    const updatedOption = {
      ...editingOption,
      values: [...editingOption.values, newValue]
    };
    
    setOptions(options.map(opt => 
      opt.id === editingOption.id ? updatedOption : opt
    ));
    
    setEditingOption(updatedOption);
    setNewValue('');
  };

  const handleDeleteValue = (optionId: string, valueIndex: number) => {
    const option = options.find(opt => opt.id === optionId);
    if (!option) return;
    
    const updatedValues = [...option.values];
    updatedValues.splice(valueIndex, 1);
    
    const updatedOption = {
      ...option,
      values: updatedValues
    };
    
    setOptions(options.map(opt => 
      opt.id === optionId ? updatedOption : opt
    ));
    
    if (editingOption && editingOption.id === optionId) {
      setEditingOption(updatedOption);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Grower Options</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Option</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="optionName" className="block text-sm font-medium text-gray-700 mb-1">
                  Option Name
                </label>
                <input
                  id="optionName"
                  type="text"
                  value={newOption.name}
                  onChange={(e) => setNewOption({...newOption, name: e.target.value})}
                  placeholder="e.g., Hybrid Types"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="optionValues" className="block text-sm font-medium text-gray-700 mb-1">
                  Option Values (comma separated)
                </label>
                <textarea
                  id="optionValues"
                  value={newOption.values}
                  onChange={(e) => setNewOption({...newOption, values: e.target.value})}
                  placeholder="e.g., Type A, Type B, Type C"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button
                onClick={handleAddOption}
                className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <Plus className="h-5 w-5" />
                <span>Add Option</span>
              </button>
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Available Options</h2>
            
            {options.length === 0 ? (
              <p className="text-gray-600">No options available.</p>
            ) : (
              <div className="space-y-4">
                {options.map((option) => (
                  <div key={option.id} className="border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-800">{option.name}</h3>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditOption(option)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteOption(option.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value, index) => (
                        <span 
                          key={index} 
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {editingOption && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Edit Option: {editingOption.name}
            </h2>
            
            <div className="mb-4">
              <div className="flex items-center mb-3">
                <input
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="Add new value"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddValue}
                  className="bg-blue-600 text-white px-3 py-2 rounded-r-md hover:bg-blue-700"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Current Values</h3>
                <div className="space-y-2">
                  {editingOption.values.map((value, index) => (
                    <div key={index} className="flex justify-between items-center bg-white p-2 rounded-md">
                      <span>{value}</span>
                      <button 
                        onClick={() => handleDeleteValue(editingOption.id, index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setEditingOption(null)}
                className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <Save className="h-5 w-5" />
                <span>Done</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddGrowerOptions;
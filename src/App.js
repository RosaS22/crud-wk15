import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SeasoningList from './SeasoningList';
import SeasoningForm from './SeasoningForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App = () => {
  const [seasonings, setSeasonings] = useState([]);
  const [selectedSeasoning, setSelectedSeasoning] = useState(null);

  // Fetch the list of seasonings (Read)
  useEffect(() => {
    fetchSeasonings();
  }, []);

  const fetchSeasonings = async () => {
    try {
      const response = await axios.get('https://6704c13dab8a8f892734b53d.mockapi.io/seasonings');
      setSeasonings(response.data);
    } catch (error) {
      console.error('Error fetching seasonings:', error);
    }
  };

  // Create a new seasoning (Create)
  const addSeasoning = async (newSeasoning) => {
    try {
      const response = await axios.post('https://6704c13dab8a8f892734b53d.mockapi.io/seasonings', newSeasoning);
      setSeasonings([...seasonings, response.data]);
    } catch (error) {
      console.error('Error adding seasoning:', error);
    }
  };

  // Update a seasoning (Update)
  const updateSeasoning = async (updatedSeasoning) => {
    try {
      const response = await axios.put(`https://6704c13dab8a8f892734b53d.mockapi.io/seasonings/${updatedSeasoning.id}`, updatedSeasoning);
      const updatedList = seasonings.map(s => s.id === updatedSeasoning.id ? response.data : s);
      setSeasonings(updatedList);
    } catch (error) {
      console.error('Error updating seasoning:', error);
    }
  };

  // Delete a seasoning (Delete)
  const deleteSeasoning = async (id) => {
    try {
      await axios.delete(`https://6704c13dab8a8f892734b53d.mockapi.io/seasonings/${id}`);
      setSeasonings(seasonings.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting seasoning:', error);
    }
  };

  return (
    <div className="appBody">
      <h1>Seasonings Inventory</h1>
      <SeasoningForm addSeasoning={addSeasoning} updateSeasoning={updateSeasoning} selectedSeasoning={selectedSeasoning} />
      <SeasoningList seasonings={seasonings} deleteSeasoning={deleteSeasoning} setSelectedSeasoning={setSelectedSeasoning} />
    </div>
  );
};

export default App;

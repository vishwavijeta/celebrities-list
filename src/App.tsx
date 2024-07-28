import React, { useState, useEffect, useCallback  } from 'react';
import data from './utils/celebrities.json';
import SearchBar from './components/SearchBar/SearchBar';
import CelebtitiesList from './components/CelebritiesList/CelebritiesList';
import ConfimationDialog from './components/ConfimationDialog/ConfimationDialog';
import { calculateAge } from './utils/AgeCalculation';
import { calculateDOB } from './utils/AgeCalculation';
import './App.css';

// declare the type for the celebtities
type Celebtities = {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
};

const App: React.FC = () => {

  // to store the celebtities
  const [celebtities, setCelebtities] = useState<Celebtities[]>([]);

  // to store the index of the celebtity that is currently open
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // to store the index of the celebtity that is currently being edited
  const [allowEdit, setAllowEdit] = useState<number | null>(null);

  // to store the index of the celebtity that is currently being deleted
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  // to store the state of the dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  // load the celebtities from the json file
  useEffect(() => {
    setCelebtities(data);
  }, []);


  // handle the expansion of the celebtity
  const handleExapansion = useCallback((index: number) => {
    if (allowEdit !== null) return;
    setOpenIndex(index === openIndex ? null : index);
  }, [allowEdit, openIndex]);

  // handle the edit of the celebtity
  const handleEdit = useCallback((index: number) => {
    setAllowEdit(index === allowEdit ? null : index);
  }, [allowEdit]);

  // handle the delete of the celebtity
  const handleDelete = useCallback((index: number) => {
    const newCelebtities = [...celebtities];
    newCelebtities.splice(index, 1);
    setCelebtities(newCelebtities);
  }, [celebtities]);

  // handle the delete click on celebrity
  const handleDeleteClick = useCallback((index: number) => {
    setDeleteIndex(index);
    setIsDialogOpen(true);
  }, []);

  // handle the dialog close
  const handleDialogClose = useCallback((action: 'cancel' | 'delete') => {
    setIsDialogOpen(false);
    if (action === 'delete' && deleteIndex !== null) {
      handleDelete(deleteIndex);
    }
    setDeleteIndex(null);
  }, [deleteIndex, handleDelete]);

  // handle the save of the celebtity
  const handleSave = useCallback((index: number, updatedCelebtity: any) => {
    updatedCelebtity.dob = calculateDOB(updatedCelebtity.dob);
    const newCelebtities = [...celebtities];
    newCelebtities[index] = { ...newCelebtities[index], ...updatedCelebtity };
    setCelebtities(newCelebtities);
    setAllowEdit(null);
  }, [celebtities]);

  // handle the search of the celebtity
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredCelebtities = data.filter((celebtity) => 
      celebtity.first.toLowerCase().includes(searchValue) ||
      celebtity.last.toLowerCase().includes(searchValue)
    );
    setCelebtities(filteredCelebtities);
  }, []);

  return (
    <>
      <div className="list-container">
        <SearchBar handleSearch={handleSearch} />
        {celebtities.map((celebtity, index) => (
          <CelebtitiesList
            key={index}
            first={celebtity.first}
            last={celebtity.last}
            dob={calculateAge(celebtity.dob)}
            gender={celebtity.gender}
            country={celebtity.country}
            picture={celebtity.picture}
            description={celebtity.description}
            isOpen={openIndex === index}
            allowEdit={allowEdit === index}
            handleExapansion={() => handleExapansion(index)}
            onEdit={() => handleEdit(index)}
            handleDelete={() => handleDeleteClick(index)}
            onSave={(updatedCelebtity) => handleSave(index, updatedCelebtity)}
          />
        ))}
      </div>
      {isDialogOpen && <ConfimationDialog onClose={handleDialogClose} title="Are you sure you want to delete?" />}
    </>
  )
};

export default App;

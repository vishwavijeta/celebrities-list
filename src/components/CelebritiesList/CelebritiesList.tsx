import React, { useState, useEffect, memo } from 'react';
import { RxCrossCircled } from "react-icons/rx";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdOutlineExpandMore } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineExpandLess } from "react-icons/md";
import './CelebritiesList.css';

interface CelebritiesListProps {
    isOpen: boolean;
    allowEdit: boolean;
    handleExapansion: () => void;
    onEdit: () => void;
    first: string;
    last: string;
    dob: number;
    gender: string;
    country: string;
    picture: string;
    description: string;
    handleDelete: () => void;
    onSave: (updatedCelebtity: any) => void;
}

const CelebritiesList: React.FC<CelebritiesListProps> = ({
    first, last, dob, gender, country, picture, description,
    isOpen, handleExapansion, allowEdit, onEdit, handleDelete, onSave }) => {

    // declare a state variable to store the editable celebtity
    const [editableCelebtity, setEditableCelebtity] = useState({
        first, last, dob, gender, country, description
    });


    // update the editable celebtity when the allowEdit prop changes
    useEffect(() => {
        if (!allowEdit) {
            setEditableCelebtity({ first, last, dob, gender, country, description });
        }
    }, [allowEdit, first, last ]);

    // handle input change event
    // update the editable celebtity state when the input value changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        console.log(e.target);
        const { name, value } = e.target;
        console.log(name, value);
        setEditableCelebtity({ ...editableCelebtity, [name]: value });
    };

    // handle save event
    // call the onSave prop with the updated celebtity
    const handleSave = () => {
        // destructure the editable celebtity
        const { first, last, dob, gender, country, description } = editableCelebtity;

        // check if all fields are filled
        // if not, show an alert
        if (!first || !last || !dob || !gender || !country || !description) {
            alert("All fields are required. Please fill in all fields.");
            return;
        }
        onSave(editableCelebtity);
        onEdit();
    };

    return (
        <>
            {!isOpen ? (
                <div className="lists">
                    <div className='list-open-input'>
                        <div className="list-open-icon">
                            <img src={picture} alt="icon" />
                        </div>
                        <div id='list-open-name'>{first} {last}</div>
                    </div>
                    <div className='list-close-btn' onClick={handleExapansion}>
                        <MdOutlineExpandMore />
                    </div>
                </div>
            ) : (
                <div className="list-open">
                    <div className="list-open-header">
                        <div className='list-open-input'>
                            <div className="list-open-icon">
                                <img src={picture} alt="icon" />
                            </div>
                            {allowEdit ? (
                                <>
                                    <input
                                        type="text"
                                        name="first"
                                        value={editableCelebtity.first}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="last"
                                        value={editableCelebtity.last}
                                        onChange={handleInputChange}
                                    />
                                </>
                            ) : (
                                <div id='list-open-name'>{first} {last}</div>
                            )}
                        </div>
                        <div className='list-close-btn' onClick={handleExapansion}>
                            <MdOutlineExpandLess />
                        </div>
                    </div>
                    <div className="list-open-content">
                        <div className="list-open-content-info">
                            <div className="d-flex">
                                <label htmlFor="age">Age</label>
                                {allowEdit ? (
                                    <input type="number" id="age" name="dob" value={editableCelebtity.dob} onChange={handleInputChange} />
                                ) : (
                                    <div id='age-text'>{dob}</div>
                                )}
                            </div>
                            <div className="d-flex">
                                <label htmlFor="gender">Gender</label>
                                {allowEdit ? (
                                    <select name="gender" id="gender" value={editableCelebtity.gender} onChange={handleInputChange}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="transgender">Transgender</option>
                                        <option value="rather-not-say">Rather not say</option>
                                        <option value="other">Other</option>
                                    </select>
                                ) : (
                                    <div id='gender-text'>{gender}</div>
                                )}
                            </div>
                            <div className="d-flex">
                                <label htmlFor="country">Country</label>
                                {allowEdit ? (
                                    <input type="text" id="country" name="country" value={editableCelebtity.country} onChange={handleInputChange} />
                                ) : (
                                    <div id='country-text'>{country}</div>
                                )}
                            </div>
                        </div>
                        <div className="list-open-content-description">
                            <label htmlFor="description">Description</label>
                            {allowEdit ? (
                                <textarea name="description" id="description" rows={7} value={editableCelebtity.description} onChange={handleInputChange} />
                            ) : (
                                <div id='description-text'>{description}</div>
                            )}
                        </div>
                    </div>
                    <div className="list-open-footer">
                        {allowEdit ? (
                            <>
                                <div className='close-icon' onClick={onEdit}>
                                    <RxCrossCircled />
                                </div>
                                <div className='check-icon' onClick={handleSave}>
                                    <IoCheckmarkCircleOutline />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='delete-icon' onClick={handleDelete}>
                                    <RiDeleteBin6Line />
                                </div>
                                <div className='edit-icon' onClick={onEdit}>
                                    <GrEdit />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default memo(CelebritiesList);

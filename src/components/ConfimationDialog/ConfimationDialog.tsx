import React from 'react';
import './ConfimationDialog.css';

type DialogProps = {
    onClose: (action: 'cancel' | 'delete') => void;
    title: string;
};

const ConfimationDialog: React.FC<DialogProps> = ({ onClose, title }) => {

    return (
        <div className="dialog-overlay">
            <div className="dialog">
                <div className="dialog-header">
                    {title}
                    <button onClick={() => onClose('cancel')} className="dialog-close-button">&times;</button>
                </div>
                <div className="dialog-buttons">
                    <button onClick={() => onClose('cancel')} className="dialog-button-cancel">Cancel</button>
                    <button onClick={() => onClose('delete')} className="dialog-button-delete">Delete</button>
                </div>
            </div>
        </div>
    )
};

export default ConfimationDialog;

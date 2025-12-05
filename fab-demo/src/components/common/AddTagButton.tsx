import React from 'react';

interface AddTagButtonProps {
    onClick: (e: React.MouseEvent) => void;
    className?: string;
    title?: string;
}

const AddTagButton: React.FC<AddTagButtonProps> = ({ onClick, className = '', title = 'Add Tag' }) => {
    return (
        <button
            onClick={onClick}
            className={`w-5 h-5 border border-dashed border-accent/50 text-accent rounded-md flex items-center justify-center hover:bg-accent/10 transition-colors duration-150 ${className}`}
            title={title}
        >
            +
        </button>
    );
};

export default AddTagButton;

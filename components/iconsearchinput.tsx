'use client';

import React from 'react';
import styled from 'styled-components';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput = ({ value, onChange, placeholder = 'Buscar...' }: SearchInputProps) => {
  return (
    <StyledWrapper>
      <div className="input-container">
        <input
          type="text"
          name="text"
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <span className="icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M14 5H20" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14 8H17" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M22 22L20 20" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input-container {
    width: 320px; /* más ancho */
    position: relative;
  }

  .input {
    width: 100%;
    height: 44px;
    padding: 10px 40px 10px 12px; /* padding derecho amplio */
    border: 2px solid black;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: box-shadow 0.3s ease;
  }

  .input:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
  }

  .icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

export default SearchInput;

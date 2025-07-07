'use client';

import styled from 'styled-components';


export default function Switch({ isOn, handleToggleAction }: { isOn: boolean; handleToggleAction: () => void }) {
  return (
    <StyledWrapper>
      <div className="checkbox-wrapper-41">
        <input type="checkbox" checked={isOn} onChange={handleToggleAction} />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .checkbox-wrapper-41 {
    --size: 60px; /* 👈 smaller size */
  }

  .checkbox-wrapper-41 input[type="checkbox"] {
    -webkit-appearance: none;
    width: var(--size);
    height: calc(var(--size) / 2);
    background-color: #fff;
    border: 2px solid #222;
    border-radius: 30px 100px 100px 100px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.95); /* 👈 subtle shadow */
    outline: none;
    cursor: pointer;
    position: relative;
    transition: all 0.4s ease;
  }

  .checkbox-wrapper-41 input[type="checkbox"]::before {
    content: "";
    position: absolute;
    width: calc(var(--size) / 2);
    height: calc(var(--size) / 2);
    left: 0;
    top: 50%;
    transform: translateY(-50%) scale(0.7);
    border: 2px solid #222;
    border-radius: 50%;
    background-color: #fde881;
    box-sizing: border-box;
    transition: all 0.4s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 👈 knob shadow */
  }

  .checkbox-wrapper-41 input[type="checkbox"]:checked {
    background-color: #fde881;
    border-radius: 100px 100px 30px 100px;
  }

  .checkbox-wrapper-41 input[type="checkbox"]:checked::before {
    left: 50%;
    background-color: #fff;
    border-radius: 50%;
  }
`;

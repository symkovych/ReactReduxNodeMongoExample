import React from 'react';


export default function ({ title, className, onClick }) {
 // const { title, className, onClick } = props;
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

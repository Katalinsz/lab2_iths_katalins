import React from 'react'; 

export const MotifListContext = React.createContext({
    selectedMotif: 3,
    onMotifClick: () => {},
  });
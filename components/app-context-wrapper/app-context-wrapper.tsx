import React from 'react';

interface AppContext {
  isServerRender: boolean;
}

// App context, used for sharing the state of the initial render
export const AppContext = React.createContext<AppContext>({ isServerRender: true });

const AppContextWrapper: React.FunctionComponent<AppContext> = ({ isServerRender, children }) => (
  <AppContext.Provider value={{ isServerRender }}>{children}</AppContext.Provider>
);

export default AppContextWrapper;

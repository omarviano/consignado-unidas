import { FunctionComponent } from 'react';

type WithContextType = (
  Component: FunctionComponent,
  ...Context: FunctionComponent[]
) => FunctionComponent;

const withContext: WithContextType = (Component, ...Contexts) => {
  if (Contexts.length === 0) return () => null;

  return function WrappedComponent() {
    const ContextTree = Contexts.reduce(
      (a, b) => args => a({ children: b(args) }),
    );

    return (
      <ContextTree>
        <Component />
      </ContextTree>
    );
  };
};

export { withContext };

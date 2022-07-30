import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="max-w-5xl px-4 mx-auto sm:px-6 md:px-8">{children}</div>
  );
}

export { Layout };

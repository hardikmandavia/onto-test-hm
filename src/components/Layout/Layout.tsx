import { ReactNode } from 'react';

import { Container } from './Layout.styled';

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => <Container>{children}</Container>;

export default Layout;

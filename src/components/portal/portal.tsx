import { createPortal } from 'react-dom';

type Props = { container: Element; children: React.ReactNode };

export const Portal = ({ container, children }: Props) => createPortal(children, container);

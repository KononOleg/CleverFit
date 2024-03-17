import { createPortal } from 'react-dom';

type Props = { container: Element | undefined; children: React.ReactNode };

export const Portal = ({ container = document.body, children }: Props) =>
    createPortal(children, container);

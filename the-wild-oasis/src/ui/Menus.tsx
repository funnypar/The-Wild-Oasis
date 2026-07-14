import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutSideClick';

type Position = {
    x: number;
    y: number;
};

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StyledToggle = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-700);
    }
`;

const StyledList = styled.ul<{ $position: Position }>`
    position: fixed;

    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);

    right: ${(props) => props.$position.x}px;
    top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 1.2rem 2.4rem;
    font-size: 1.4rem;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    gap: 1.6rem;

    &:hover {
        background-color: var(--color-grey-50);
    }

    & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }
`;

type MenusContextType = {
    openId: string;
    close: () => void;
    open: Dispatch<SetStateAction<string>>;
    position: Position | null;
    setPosition: Dispatch<SetStateAction<Position | null>>;
};

const MenusContext = createContext<MenusContextType | undefined>(undefined);

function useMenusContext() {
    const context = useContext(MenusContext);
    if (!context) {
        throw new Error(
            'Menus compound components must be used within <Menus>',
        );
    }
    return context;
}

function Menus({ children }: { children: ReactNode }) {
    const [openId, setOpenId] = useState<string>('');
    const [position, setPosition] = useState<Position | null>(null);

    const close = () => setOpenId('');
    const open = setOpenId;

    return (
        <MenusContext.Provider
            value={{ openId, close, open, position, setPosition }}
        >
            {children}
        </MenusContext.Provider>
    );
}

function Toggle({ id }: { id: string }) {
    const { openId, close, open, setPosition } = useMenusContext();

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        const rect = (e.target as HTMLElement)
            .closest('button')!
            .getBoundingClientRect();
        setPosition({
            x: window.innerWidth - rect.width - rect.x,
            y: rect.y + rect.height + 8,
        });

        openId === '' || openId !== id ? open(id) : close();
    }

    return (
        <StyledToggle onClick={handleClick}>
            <HiEllipsisVertical />
        </StyledToggle>
    );
}

function List({ id, children }: { id: string; children: ReactNode }) {
    const { openId, position, close } = useMenusContext();
    const ref = useOutsideClick<HTMLUListElement>(close);

    if (openId !== id) return null;
    if (!position) return null;

    return createPortal(
        <StyledList $position={position} ref={ref}>
            {children}
        </StyledList>,
        document.body,
    );
}

function Button({
    children,
    icon,
    onClick,
}: {
    children: ReactNode;
    icon: ReactNode;
    onClick?: () => void;
}) {
    const { close } = useMenusContext();

    function handleClick() {
        onClick?.();
        close();
    }

    return (
        <li>
            <StyledButton onClick={handleClick}>
                {icon}
                <span>{children}</span>
            </StyledButton>
        </li>
    );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;

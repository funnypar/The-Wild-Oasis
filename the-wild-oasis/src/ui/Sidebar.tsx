import styled from 'styled-components';
import Uploader from '../data/Uploader';
import Logo from './Logo';
import MainNav from './MainNav';

const StyledSideBar = styled.aside`
    padding: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);
    grid-row: 1/-1;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`;

export default function Sidebar() {
    return (
        <StyledSideBar>
            <Logo />
            <MainNav />

            <Uploader />
        </StyledSideBar>
    );
}

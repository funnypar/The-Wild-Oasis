import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { PAGE_SIZE } from '../utils/constants';

const StyledPagination = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const P = styled.p`
    font-size: 1.4rem;
    margin-left: 0.8rem;

    & span {
        font-weight: 600;
    }
`;

const Buttons = styled.div`
    display: flex;
    gap: 0.6rem;
`;

const PaginationButton = styled.button`
    background-color: ${(props) =>
        props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
    color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
    border: none;
    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.6rem 1.2rem;
    transition: all 0.3s;

    &:has(span:last-child) {
        padding-left: 0.4rem;
    }

    &:has(span:first-child) {
        padding-right: 0.4rem;
    }

    & svg {
        height: 1.8rem;
        width: 1.8rem;
    }

    &:hover:not(:disabled) {
        background-color: var(--color-brand-600);
        color: var(--color-brand-50);
    }
`;

type Props = {
    count: number;
    pageSize?: number;
};

export default function Pagination({ count, pageSize = PAGE_SIZE }: Props) {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = Number(searchParams.get('page')) || 1;
    const totalPages = Math.ceil(count / pageSize);

    function handlePrevious() {
        const prev = currentPage === 1 ? currentPage : currentPage - 1;
        const params = new URLSearchParams(searchParams);
        params.set('page', String(prev));
        setSearchParams(params);
    }

    function handleNext() {
        const next = currentPage === totalPages ? currentPage : currentPage + 1;
        const params = new URLSearchParams(searchParams);
        params.set('page', String(next));
        setSearchParams(params);
    }

    if (totalPages <= 1) return null;
    return (
        <StyledPagination>
            <P>
                Page <span>{currentPage}</span> of <span>{totalPages}</span>
            </P>
            <Buttons>
                <PaginationButton
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                >
                    <HiChevronLeft />
                    <span>Previous</span>
                </PaginationButton>
                <PaginationButton
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                >
                    <span>Next</span>
                    <HiChevronRight />
                </PaginationButton>
            </Buttons>
        </StyledPagination>
    );
}

import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "src/hooks/useAppSelector";
import FSelect from "./FSelect";
import IconButton from "./IconButton";
import { RootState } from "src/store";
import { setFilter, setPage, setSort } from "src/store/slices/dogsSlice";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { useState } from "react";

export default function PageIndicator() {
    const dispatch = useAppDispatch();
    const { page, pageSize, totalResults, filter, sort } = useAppSelector(
        (state: RootState) => state.dogs);
    return (
        <div className="mx-auto px-4 py-6 flex flex-row justify-between max-w-md gap-4 items-center">
            <FSelect
                className="min-w-16 w-32"
                label="Filter by" options={
                    [
                        { label: 'Breed', value: 'breed' },
                        { label: 'Name', value: 'name' },
                        { label: 'Age', value: 'age' }
                    ]
                } value={filter} onChange={(x: string) => {
                    dispatch(setFilter(x));
                }} />

            <FSelect
                className="min-w-16 w-32"
                label="Sort" options={
                    [
                        { label: 'Ascending', value: 'asc' },
                        { label: 'Descending', value: 'desc' }
                    ]
                } value={sort} onChange={(s: string) => {
                    dispatch(setSort(s));
                }} />
            <div className="flex flex-row gap-4 items-center">
                <IconButton
                    ariaLabel="Previous Page"
                    onClick={() => {
                        if (page > 0) {
                            dispatch(setPage(page - 1));
                        }
                    }}>
                    <IoChevronBackOutline size={24} />
                </IconButton>
                <p className="text-sm text-gray-500">
                    {page * pageSize} - {page * pageSize + pageSize} of

                    {totalResults}
                </p>
                <IconButton
                    ariaLabel="Next Page"
                    onClick={() => {
                        if (page * pageSize < totalResults) {
                            dispatch(setPage(page + 1));
                        }
                    }}>
                    <IoChevronForwardOutline size={24} />
                </IconButton>
            </div>
        </div>
    );
}